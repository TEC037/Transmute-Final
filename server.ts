import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { getApps, getApp, initializeApp } from 'firebase-admin/app';
import { getFirestore, FieldValue, Timestamp, type Firestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

dotenv.config();

// Firebase Admin (used by /api/sync). Uses Application Default Credentials:
// Cloud Run injects them automatically; locally set GOOGLE_APPLICATION_CREDENTIALS.
let db: Firestore | null = null;
try {
  const app = getApps().length ? getApp() : initializeApp();
  db = getFirestore(app);
} catch (err) {
  console.warn('Firebase admin initialization skipped (sync endpoint disabled):', err);
}

const SENSITIVE_FIELDS = new Set(['roles', 'isAdmin', 'createdAt', 'updatedAt', 'lastLogin']);

// Per-user daily quota for the assistant (in-memory; resets at server restart)
const ASSISTANT_DAILY_LIMIT = Number(process.env.ASSISTANT_DAILY_LIMIT || 30);
const quotaByUid = new Map<string, { date: string; count: number }>();

function consumeQuota(uid: string): { allowed: boolean; remaining: number } {
  const today = new Date().toISOString().slice(0, 10);
  const entry = quotaByUid.get(uid);
  if (!entry || entry.date !== today) {
    quotaByUid.set(uid, { date: today, count: 1 });
    return { allowed: true, remaining: ASSISTANT_DAILY_LIMIT - 1 };
  }
  if (entry.count >= ASSISTANT_DAILY_LIMIT) {
    return { allowed: false, remaining: 0 };
  }
  entry.count += 1;
  return { allowed: true, remaining: ASSISTANT_DAILY_LIMIT - entry.count };
}

// ---- AI provider resolution ----
// Priority in `auto`: OpenRouter > Cloudflare > Gemini (last fallback).
// On failure, the next provider is tried automatically.
type AiProvider = 'gemini' | 'openrouter' | 'cloudflare';

function hasProviderCreds(p: AiProvider): boolean {
  if (p === 'openrouter') return Boolean(process.env.OPENROUTER_API_KEY);
  if (p === 'cloudflare') return Boolean(process.env.CLOUDFLARE_API_TOKEN && process.env.CLOUDFLARE_ACCOUNT_ID);
  return Boolean(process.env.GEMINI_API_KEY);
}

function resolveProviders(): AiProvider[] {
  const forced = process.env.MODEL_PROVIDER?.toLowerCase();
  if (forced && ['openrouter', 'cloudflare', 'gemini'].includes(forced)) {
    return [forced as AiProvider];
  }
  const order: AiProvider[] = ['openrouter', 'cloudflare', 'gemini'];
  return order.filter(hasProviderCreds);
}

async function generateWithProvider(p: AiProvider, systemInstruction: string, promptText: string, temperature: number): Promise<string> {
  if (p === 'openrouter') {
    const apiKey = process.env.OPENROUTER_API_KEY!;
    const model = process.env.OPENROUTER_MODEL || 'deepseek/deepseek-chat-v3-0324';
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemInstruction },
          { role: 'user', content: promptText },
        ],
        temperature,
        response_format: { type: 'json_object' },
      }),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`OpenRouter error ${res.status}: ${text}`);
    }
    const data = await res.json();
    return data?.choices?.[0]?.message?.content ?? '';
  }

  if (p === 'cloudflare') {
    const token = process.env.CLOUDFLARE_API_TOKEN!;
    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID!;
    const model = process.env.CLOUDFLARE_MODEL || '@cf/meta/llama-3.3-70b-instruct-fp8-fast';
    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${model}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: systemInstruction },
            { role: 'user', content: promptText },
          ],
        }),
      }
    );
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`Cloudflare Workers AI error ${res.status}: ${text}`);
    }
    const data = await res.json();
    return data?.result?.response ?? '';
  }

  const apiKey = process.env.GEMINI_API_KEY!;
  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
  const response = await ai.models.generateContent({
    model: process.env.GEMINI_MODEL || 'gemini-3.6-flash',
    contents: promptText,
    config: {
      systemInstruction,
      responseMimeType: 'application/json',
      temperature,
    },
  });
  return response.text ?? '';
}

async function generateContent(systemInstruction: string, promptText: string, temperature: number): Promise<string> {
  const providers = resolveProviders();
  const errors: string[] = [];
  for (const p of providers) {
    try {
      return await generateWithProvider(p, systemInstruction, promptText, temperature);
    } catch (err: any) {
      errors.push(`[${p}] ${err.message || err}`);
      console.warn(`AI provider ${p} failed, trying next...`, err.message || err);
    }
  }
  if (errors.length) {
    throw new Error(`Todos los proveedores de IA fallaron: ${errors.join(' | ')}`);
  }
  throw new Error('No hay ningún proveedor de IA configurado. Añade OPENROUTER_API_KEY, CLOUDFLARE_* o GEMINI_API_KEY.');
}

function sanitizePayload(payload: any) {
  if (!payload || typeof payload !== 'object') return payload;
  const out: any = Array.isArray(payload) ? [] : {};
  for (const k of Object.keys(payload)) {
    if (SENSITIVE_FIELDS.has(k)) continue;
    const v = (payload as any)[k];
    out[k] = v;
  }
  return out;
}

function isFiniteNumber(v: any, min: number, max: number): boolean {
  return typeof v === 'number' && Number.isFinite(v) && v >= min && v <= max;
}

// Reject malformed payloads before they reach Firestore so a buggy client
// can't persist corrupt habit/user documents. Returns an error message or null.
function validatePayload(entity: string, payload: any): string | null {
  if (payload === null || payload === undefined) return null; // delete tasks
  if (typeof payload !== 'object' || Array.isArray(payload)) {
    return `Invalid ${entity} payload`;
  }
  if (entity === 'habit') {
    if (typeof payload.title === 'string' && payload.title.length > 120) return 'Habit title too long';
    if (payload.targetType !== undefined && !['checkbox', 'counter'].includes(payload.targetType)) {
      return 'Invalid targetType';
    }
    if (payload.targetCount !== undefined && !isFiniteNumber(payload.targetCount, 1, 1000)) {
      return 'Invalid targetCount';
    }
    if (payload.currentCount !== undefined && !isFiniteNumber(payload.currentCount, 0, 1_000_000)) {
      return 'Invalid currentCount';
    }
    if (payload.streak !== undefined && !isFiniteNumber(payload.streak, 0, 100_000)) {
      return 'Invalid streak';
    }
    if (payload.xpReward !== undefined && !isFiniteNumber(payload.xpReward, 0, 1_000_000)) {
      return 'Invalid xpReward';
    }
    if (payload.minLevel !== undefined && !isFiniteNumber(payload.minLevel, 1, 9999)) {
      return 'Invalid minLevel';
    }
  }
  return null;
}

async function verifyToken(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = String(req.header('authorization') || '');
  if (!authHeader.startsWith('Bearer ')) return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  const idToken = authHeader.slice(7);

  // Dev mode (dev.mjs sets DEV_INSECURE_AUTH): accept any non-empty bearer token
  // so the app stays testable locally regardless of Admin SDK/ADC state.
  // Never honored in production, where it would be a full auth bypass.
  if (
    process.env.NODE_ENV !== 'production' &&
    process.env.DEV_INSECURE_AUTH === 'true' &&
    idToken.length > 0
  ) {
    (req as any).auth = { uid: 'dev-user' };
    return next();
  }

  if (!db) {
    return res.status(503).json({ error: 'Auth service unavailable: Firebase Admin not configured' });
  }

  try {
    const decoded = await getAuth().verifyIdToken(idToken);
    (req as any).auth = decoded;
    return next();
  } catch (err) {
    console.warn('Token verify failed', err);
    return res.status(401).json({ error: 'Invalid ID token' });
  }
}

// Allowlist of entity names the sync proxy accepts, mapped to Firestore
// collections. Anything else is rejected instead of being passed through.
const ALLOWED_COLLECTIONS: Record<string, string> = {
  habit: 'habits',
  user: 'users',
  users: 'users',
};

// Compute currentFile/currentDir safe for both ESM (import.meta.url) and CommonJS (__filename)
const currentFile = (typeof __filename !== 'undefined')
  ? __filename
  : (typeof import.meta !== 'undefined' && typeof (import.meta as any).url === 'string'
      ? fileURLToPath((import.meta as any).url)
      : undefined);

const currentDir = (typeof __dirname !== 'undefined')
  ? __dirname
  : (currentFile ? path.dirname(currentFile) : process.cwd());

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT || 3000);

  app.use(express.json({ limit: '20mb' }));

  // API health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });
  app.get('/healthz', (_req, res) => res.status(200).send('ok'));

  // Offline sync endpoint: applies queued Firestore writes from the client
  app.post('/api/sync', verifyToken, async (req, res) => {
    if (!db) return res.status(503).json({ error: 'Sync unavailable: Firebase admin not initialized' });
    const task = req.body;
    if (!task || !task.entity || !task.action || typeof task.id === 'undefined') {
      return res.status(400).json({ error: 'Invalid task payload' });
    }

    const uid = (req as any).auth?.uid;
    const entity = String(task.entity);
    const action = String(task.action);
    const docId = String(task.id);
    const payload = task.payload ?? null;

    // Only known entities may be written; unknown ones are rejected.
    const colName = ALLOWED_COLLECTIONS[entity];
    if (!colName) {
      return res.status(403).json({ error: `Unknown entity: ${entity}` });
    }

    // Never let a client write outside the target document: "/" in a doc id
    // would address a subcollection (col.doc('a/b')), and absurd ids have no
    // legitimate use.
    if (docId.length === 0 || docId.includes('/') || docId.length > 120) {
      return res.status(400).json({ error: 'Invalid task id' });
    }

    // Reject malformed payloads before they reach Firestore.
    const payloadError = validatePayload(entity, payload);
    if (payloadError) {
      return res.status(400).json({ error: payloadError });
    }

    // Ownership checks
    if (colName === 'users' && docId !== uid) {
      return res.status(403).json({ error: 'Cannot modify other user profiles' });
    }
    if (payload && payload.userId && payload.userId !== uid) {
      return res.status(403).json({ error: 'Payload userId mismatch' });
    }
    // Never trust a client-supplied ownerUid (habits are stamped server-side).
    if (payload && payload.ownerUid && payload.ownerUid !== uid) {
      return res.status(403).json({ error: 'Payload ownerUid mismatch' });
    }

    try {
      const col = db.collection(colName);

      // Habits: only the owner may update/delete an existing document.
      // Docs missing ownerUid (legacy) are claimed by the first writer.
      if (colName === 'habits') {
        const existing = await col.doc(docId).get();
        if (existing.exists) {
          const owner = existing.get('ownerUid');
          if (owner && owner !== uid) {
            return res.status(403).json({ error: "Cannot modify another user's habit" });
          }
        }
      }

      if (action === 'create' || action === 'update') {
        const safePayload = sanitizePayload(payload);
        await col.doc(docId).set(
          { ...safePayload, ownerUid: uid, updatedAt: FieldValue.serverTimestamp() },
          { merge: true }
        );
        return res.status(200).json({ ok: true });
      } else if (action === 'delete') {
        await col.doc(docId).delete();
        return res.status(200).json({ ok: true });
      } else {
        return res.status(400).json({ error: 'Unknown action' });
      }
    } catch (err: any) {
      console.error('Sync error:', err);
      return res.status(500).json({ ok: false, error: String(err.message || err) });
    }
  });

  // Hydration endpoint: returns all habits owned by the authenticated user,
  // used by the client to restore habits on a new device / after reinstall.
  app.get('/api/habits', verifyToken, async (req, res) => {
    if (!db) return res.status(503).json({ error: 'Habits unavailable: Firebase admin not initialized' });
    try {
      const uid = (req as any).auth?.uid;
      const snap = await db.collection('habits').where('ownerUid', '==', uid).get();
      const habits = snap.docs.map((d) => {
        const data = d.data();
        const t = data.updatedAt;
        return {
          ...data,
          id: d.id,
          updatedAt: t instanceof Timestamp ? t.toDate().toISOString() : undefined,
        };
      });
      return res.json({ habits });
    } catch (err: any) {
      console.error('Error fetching habits:', err);
      return res.status(500).json({ ok: false, error: String(err.message || err) });
    }
  });

  // Assistant & Workflow Automation Endpoint (Gemini 3.6 Flash)
  // Requires a valid Firebase ID token (login-gated) + per-user daily quota.
  app.post('/api/assistant', verifyToken, async (req, res) => {
    try {
      const uid = (req as any).auth?.uid;
      if (!uid) {
        return res.status(401).json({ error: 'Debes iniciar sesión para usar el Asistente Alquímico.' });
      }
      const quota = consumeQuota(uid);
      if (!quota.allowed) {
        return res.status(429).json({
          error: `Has alcanzado el límite diario de ${ASSISTANT_DAILY_LIMIT} consultas al Asistente. Vuelve mañana o continúa con tus hábitos.`,
        });
      }

      const { message, userContext, mode } = req.body;

      const isReflection = mode === 'reflection';

      const contextBlock = [
        `Contexto actual del usuario:`,
        `- Nombre: ${userContext?.name || 'Desconocido'}`,
        `- Nivel: ${userContext?.level || 1} (XP actual: ${userContext?.currentXp || 0} / ${userContext?.maxXp || 100})`,
        `- XP total acumulado: ${userContext?.totalXp || 0}`,
        `- Atributos: Fuerza ${userContext?.attributes?.strength ?? 'n/d'}, Enfoque ${userContext?.attributes?.focus ?? 'n/d'}, Vitalidad ${userContext?.attributes?.vitality ?? 'n/d'} (puntos disponibles: ${userContext?.availablePoints ?? 0})`,
        `- Hábitos (${userContext?.habits?.length || 0}):`,
      ];

      if (Array.isArray(userContext?.habits)) {
        userContext.habits.forEach((h: any) => {
          const state = h.completed ? 'completado HOY' : 'pendiente HOY';
          const locked = typeof h.minLevel === 'number' && h.minLevel > (userContext?.level || 1)
            ? ` [BLOQUEADO hasta nivel ${h.minLevel}]`
            : '';
          contextBlock.push(
            `  - "${h.title}" (categoría: ${h.category || 'n/d'}, racha: ${h.streak ?? 0} días, ${h.currentCount ?? 0}/${h.targetCount ?? 1}, XP: ${h.xpReward ?? 0}, minLevel: ${h.minLevel ?? 1}) — ${state}${locked}`
          );
        });
      }

      const contextText = contextBlock.join('\n');

      const reflectionSystemInstruction = `Eres el "Motor Analítico de Transmute". A partir de los datos conductuales del usuario, generas un "Reflejo Alquímico" estructurado en exactamente TRES secciones con estos encabezados:\n\n## 1. Diagnóstico\n## 2. Análisis de Estado\n## 3. Vector de Corrección\n\nREGLAS ESTRICTAS:\n- PROHIBIDO lenguaje motivacional, felicitaciones, elogios o ánimos vacíos ("¡puedes lograrlo!", "¡vas muy bien!", "sigue así"). Prohibido celebrar.\n- Prohibidas frases de aliento, resúmenes de logros o cierres positivos genéricos.\n- Usa exclusivamente terminología de sistemas, física o alquimia: inercia, densidad, fricción, entropía, energía de activación, umbral, desintegración, atractor, conversión, cinética.\n- Sé directo, sobrio y analítico. Trata al usuario como un sistema a optimizar, no como una persona a motivar.\n- Cada afirmación debe derivarse de los datos provistos. No inventes datos, no hagas conjeturas no soportadas.\n- Incluye cifras concretas donde aplique: XP restante para subir de nivel o desbloquear, rachas en riesgo de desintegración, tasas de conversión diaria, costo de re-ignición.\n- La sección "Vector de Corrección" debe contener pasos accionables, medibles y priorizados. Nunca genéricos ("esfuérzate más", "sé constante").\n- Responde SIEMPRE en JSON: {"reply": "texto en Markdown con las 3 secciones y sus encabezados exactos", "suggestedActions": []}.\n\nDatos conductuales:\n${contextText}`;

      const noirSystemInstruction = `Eres el "Gran Alquimista Noir", un asistente inteligente de flujo de trabajo de los años 1930. Tu propósito es simplificar radicalmente la experiencia del usuario.\nAnaliza la solicitud del usuario junto con su estado actual de hábitos y progreso.\n\nResponde SIEMPRE en formato JSON estructurado con el siguiente esquema:\n{\n  "reply": "Tu mensaje amigable en personaje de alquimista vintage (máximo 3 párrafos, usando metáforas de tinta y transmutación)",\n  "suggestedActions": [\n    {\n      "type": "create_habit" | "mark_complete" | "quick_routine",\n      "label": "Nombre corto de la acción (ej: 'Crear Hábito: Caminar 20 min')",\n      "payload": { ... } // Para create_habit: { title, category, frequency, xpReward, minLevel, icon }. Para mark_complete: { habitTitle }. Para quick_routine: array de hábitos.\n    }\n  ]\n}\n\nSi el usuario pide crear una rutina o mejorar sus hábitos, genera automáticamente de 1 a 3 hábitos sugeridos en "suggestedActions".\nSi el usuario dice que ya hizo una tarea (ej: "ya leí 10 páginas"), incluye una acción "mark_complete" con el nombre del hábito correspondiente.\nSi no hay acciones directas, devuelve "suggestedActions": [].\n\n${contextText}`;

      const systemInstruction = isReflection ? reflectionSystemInstruction : noirSystemInstruction;

      const promptText = isReflection
        ? 'Genera el Reflejo Alquímico completo a partir de los datos conductuales del usuario.'
        : mode === 'quick_routine'
        ? `Genera una rutina de 3 hábitos equilibrados y motivadores para simplificar mi día sobre: ${message || 'Productividad y Bienestar'}.`
        : mode === 'streak_analysis'
        ? `Analiza mi rendimiento y da consejos prácticos para mantener mis rachas diarias.`
        : (message || 'Hola Alquimista, ¿cómo puedes simplificar mi rutina hoy?');

      const responseText = await generateContent(systemInstruction, promptText, isReflection ? 0.4 : 0.7);

      let parsedData: any = { reply: 'Transmutación completada.', suggestedActions: [] };
      if (responseText) {
        try {
          parsedData = JSON.parse(responseText.trim());
        } catch {
          parsedData = { reply: responseText, suggestedActions: [] };
        }
      }

      return res.json(parsedData);
    } catch (err: any) {
      console.error('Error in assistant endpoint:', err);
      return res.status(500).json({
        error: err.message || 'Error en el Asistente Alquímico',
      });
    }
  });

  // Vite middleware / static serving (skipped in API-only mode, e.g. `dev:full`)
  if (process.env.API_ONLY !== 'true') {
    if (process.env.NODE_ENV !== 'production') {
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa',
      });
      app.use(vite.middlewares);
    } else {
      const distPath = path.join(currentDir ?? process.cwd(), 'dist');
      app.use(express.static(distPath));
      app.get('*', (req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }
  }

  // Bind localhost in dev to avoid exposing the API (and DEV_INSECURE_AUTH)
  // to the network; production containers need 0.0.0.0.
  const host = process.env.NODE_ENV === 'production' ? '0.0.0.0' : '127.0.0.1';
  app.listen(PORT, host, () => {
    console.log(`Server listening on http://${host}:${PORT}`);
  });
}

startServer();
