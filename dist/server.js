// server.ts
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { getApps, getApp, initializeApp } from "firebase-admin/app";
import { getFirestore, FieldValue, Timestamp } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
dotenv.config();
var db = null;
try {
  const app = getApps().length ? getApp() : initializeApp();
  db = getFirestore(app);
} catch (err) {
  console.warn("Firebase admin initialization skipped (sync endpoint disabled):", err);
}
var SENSITIVE_FIELDS = /* @__PURE__ */ new Set(["roles", "isAdmin", "createdAt", "updatedAt", "lastLogin"]);
var ASSISTANT_DAILY_LIMIT = Number(process.env.ASSISTANT_DAILY_LIMIT || 30);
var quotaByUid = /* @__PURE__ */ new Map();
function consumeQuota(uid) {
  const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
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
function hasProviderCreds(p) {
  if (p === "openrouter") return Boolean(process.env.OPENROUTER_API_KEY);
  if (p === "cloudflare") return Boolean(process.env.CLOUDFLARE_API_TOKEN && process.env.CLOUDFLARE_ACCOUNT_ID);
  return Boolean(process.env.GEMINI_API_KEY);
}
function resolveProviders() {
  const forced = process.env.MODEL_PROVIDER?.toLowerCase();
  if (forced && ["openrouter", "cloudflare", "gemini"].includes(forced)) {
    return [forced];
  }
  const order = ["openrouter", "cloudflare", "gemini"];
  return order.filter(hasProviderCreds);
}
async function generateWithProvider(p, systemInstruction, promptText, temperature) {
  if (p === "openrouter") {
    const apiKey2 = process.env.OPENROUTER_API_KEY;
    const model = process.env.OPENROUTER_MODEL || "deepseek/deepseek-chat-v3-0324";
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey2}`
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemInstruction },
          { role: "user", content: promptText }
        ],
        temperature,
        response_format: { type: "json_object" }
      })
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`OpenRouter error ${res.status}: ${text}`);
    }
    const data = await res.json();
    return data?.choices?.[0]?.message?.content ?? "";
  }
  if (p === "cloudflare") {
    const token = process.env.CLOUDFLARE_API_TOKEN;
    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const model = process.env.CLOUDFLARE_MODEL || "@cf/meta/llama-3.3-70b-instruct-fp8-fast";
    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${model}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: systemInstruction },
            { role: "user", content: promptText }
          ]
        })
      }
    );
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`Cloudflare Workers AI error ${res.status}: ${text}`);
    }
    const data = await res.json();
    return data?.result?.response ?? "";
  }
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build"
      }
    }
  });
  const response = await ai.models.generateContent({
    model: process.env.GEMINI_MODEL || "gemini-3.6-flash",
    contents: promptText,
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      temperature
    }
  });
  return response.text ?? "";
}
async function generateContent(systemInstruction, promptText, temperature) {
  const providers = resolveProviders();
  const errors = [];
  for (const p of providers) {
    try {
      return await generateWithProvider(p, systemInstruction, promptText, temperature);
    } catch (err) {
      errors.push(`[${p}] ${err.message || err}`);
      console.warn(`AI provider ${p} failed, trying next...`, err.message || err);
    }
  }
  if (errors.length) {
    throw new Error(`Todos los proveedores de IA fallaron: ${errors.join(" | ")}`);
  }
  throw new Error("No hay ning\xFAn proveedor de IA configurado. A\xF1ade OPENROUTER_API_KEY, CLOUDFLARE_* o GEMINI_API_KEY.");
}
function sanitizePayload(payload) {
  if (!payload || typeof payload !== "object") return payload;
  const out = Array.isArray(payload) ? [] : {};
  for (const k of Object.keys(payload)) {
    if (SENSITIVE_FIELDS.has(k)) continue;
    const v = payload[k];
    out[k] = v;
  }
  return out;
}
async function verifyToken(req, res, next) {
  const authHeader = String(req.header("authorization") || "");
  if (!authHeader.startsWith("Bearer ")) return res.status(401).json({ error: "Missing or invalid Authorization header" });
  const idToken = authHeader.slice(7);
  if (process.env.NODE_ENV !== "production" && process.env.DEV_INSECURE_AUTH === "true" && idToken.length > 0) {
    req.auth = { uid: "dev-user" };
    return next();
  }
  if (!db) {
    return res.status(503).json({ error: "Auth service unavailable: Firebase Admin not configured" });
  }
  try {
    const decoded = await getAuth().verifyIdToken(idToken);
    req.auth = decoded;
    return next();
  } catch (err) {
    console.warn("Token verify failed", err);
    return res.status(401).json({ error: "Invalid ID token" });
  }
}
var ALLOWED_COLLECTIONS = {
  habit: "habits",
  user: "users",
  users: "users"
};
var currentFile = typeof __filename !== "undefined" ? __filename : typeof import.meta !== "undefined" && typeof import.meta.url === "string" ? fileURLToPath(import.meta.url) : void 0;
var currentDir = typeof __dirname !== "undefined" ? __dirname : currentFile ? path.dirname(currentFile) : process.cwd();
async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT || 3e3);
  app.use(express.json({ limit: "20mb" }));
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: (/* @__PURE__ */ new Date()).toISOString() });
  });
  app.get("/healthz", (_req, res) => res.status(200).send("ok"));
  app.post("/api/sync", verifyToken, async (req, res) => {
    if (!db) return res.status(503).json({ error: "Sync unavailable: Firebase admin not initialized" });
    const task = req.body;
    if (!task || !task.entity || !task.action || typeof task.id === "undefined") {
      return res.status(400).json({ error: "Invalid task payload" });
    }
    const uid = req.auth?.uid;
    const entity = String(task.entity);
    const action = String(task.action);
    const docId = String(task.id);
    const payload = task.payload ?? null;
    const colName = ALLOWED_COLLECTIONS[entity];
    if (!colName) {
      return res.status(403).json({ error: `Unknown entity: ${entity}` });
    }
    if (colName === "users" && docId !== uid) {
      return res.status(403).json({ error: "Cannot modify other user profiles" });
    }
    if (payload && payload.userId && payload.userId !== uid) {
      return res.status(403).json({ error: "Payload userId mismatch" });
    }
    if (payload && payload.ownerUid && payload.ownerUid !== uid) {
      return res.status(403).json({ error: "Payload ownerUid mismatch" });
    }
    try {
      const col = db.collection(colName);
      if (colName === "habits") {
        const existing = await col.doc(docId).get();
        if (existing.exists) {
          const owner = existing.get("ownerUid");
          if (owner && owner !== uid) {
            return res.status(403).json({ error: "Cannot modify another user's habit" });
          }
        }
      }
      if (action === "create" || action === "update") {
        const safePayload = sanitizePayload(payload);
        await col.doc(docId).set(
          { ...safePayload, ownerUid: uid, updatedAt: FieldValue.serverTimestamp() },
          { merge: true }
        );
        return res.status(200).json({ ok: true });
      } else if (action === "delete") {
        await col.doc(docId).delete();
        return res.status(200).json({ ok: true });
      } else {
        return res.status(400).json({ error: "Unknown action" });
      }
    } catch (err) {
      console.error("Sync error:", err);
      return res.status(500).json({ ok: false, error: String(err.message || err) });
    }
  });
  app.get("/api/habits", verifyToken, async (req, res) => {
    if (!db) return res.status(503).json({ error: "Habits unavailable: Firebase admin not initialized" });
    try {
      const uid = req.auth?.uid;
      const snap = await db.collection("habits").where("ownerUid", "==", uid).get();
      const habits = snap.docs.map((d) => {
        const data = d.data();
        const t = data.updatedAt;
        return {
          ...data,
          id: d.id,
          updatedAt: t instanceof Timestamp ? t.toDate().toISOString() : void 0
        };
      });
      return res.json({ habits });
    } catch (err) {
      console.error("Error fetching habits:", err);
      return res.status(500).json({ ok: false, error: String(err.message || err) });
    }
  });
  app.post("/api/assistant", verifyToken, async (req, res) => {
    try {
      const uid = req.auth?.uid;
      if (!uid) {
        return res.status(401).json({ error: "Debes iniciar sesi\xF3n para usar el Asistente Alqu\xEDmico." });
      }
      const quota = consumeQuota(uid);
      if (!quota.allowed) {
        return res.status(429).json({
          error: `Has alcanzado el l\xEDmite diario de ${ASSISTANT_DAILY_LIMIT} consultas al Asistente. Vuelve ma\xF1ana o contin\xFAa con tus h\xE1bitos.`
        });
      }
      const { message, userContext, mode } = req.body;
      const isReflection = mode === "reflection";
      const contextBlock = [
        `Contexto actual del usuario:`,
        `- Nombre: ${userContext?.name || "Desconocido"}`,
        `- Nivel: ${userContext?.level || 1} (XP actual: ${userContext?.currentXp || 0} / ${userContext?.maxXp || 100})`,
        `- XP total acumulado: ${userContext?.totalXp || 0}`,
        `- Atributos: Fuerza ${userContext?.attributes?.strength ?? "n/d"}, Enfoque ${userContext?.attributes?.focus ?? "n/d"}, Vitalidad ${userContext?.attributes?.vitality ?? "n/d"} (puntos disponibles: ${userContext?.availablePoints ?? 0})`,
        `- H\xE1bitos (${userContext?.habits?.length || 0}):`
      ];
      if (Array.isArray(userContext?.habits)) {
        userContext.habits.forEach((h) => {
          const state = h.completed ? "completado HOY" : "pendiente HOY";
          const locked = typeof h.minLevel === "number" && h.minLevel > (userContext?.level || 1) ? ` [BLOQUEADO hasta nivel ${h.minLevel}]` : "";
          contextBlock.push(
            `  - "${h.title}" (categor\xEDa: ${h.category || "n/d"}, racha: ${h.streak ?? 0} d\xEDas, ${h.currentCount ?? 0}/${h.targetCount ?? 1}, XP: ${h.xpReward ?? 0}, minLevel: ${h.minLevel ?? 1}) \u2014 ${state}${locked}`
          );
        });
      }
      const contextText = contextBlock.join("\n");
      const reflectionSystemInstruction = `Eres el "Motor Anal\xEDtico de Transmute". A partir de los datos conductuales del usuario, generas un "Reflejo Alqu\xEDmico" estructurado en exactamente TRES secciones con estos encabezados:

## 1. Diagn\xF3stico
## 2. An\xE1lisis de Estado
## 3. Vector de Correcci\xF3n

REGLAS ESTRICTAS:
- PROHIBIDO lenguaje motivacional, felicitaciones, elogios o \xE1nimos vac\xEDos ("\xA1puedes lograrlo!", "\xA1vas muy bien!", "sigue as\xED"). Prohibido celebrar.
- Prohibidas frases de aliento, res\xFAmenes de logros o cierres positivos gen\xE9ricos.
- Usa exclusivamente terminolog\xEDa de sistemas, f\xEDsica o alquimia: inercia, densidad, fricci\xF3n, entrop\xEDa, energ\xEDa de activaci\xF3n, umbral, desintegraci\xF3n, atractor, conversi\xF3n, cin\xE9tica.
- S\xE9 directo, sobrio y anal\xEDtico. Trata al usuario como un sistema a optimizar, no como una persona a motivar.
- Cada afirmaci\xF3n debe derivarse de los datos provistos. No inventes datos, no hagas conjeturas no soportadas.
- Incluye cifras concretas donde aplique: XP restante para subir de nivel o desbloquear, rachas en riesgo de desintegraci\xF3n, tasas de conversi\xF3n diaria, costo de re-ignici\xF3n.
- La secci\xF3n "Vector de Correcci\xF3n" debe contener pasos accionables, medibles y priorizados. Nunca gen\xE9ricos ("esfu\xE9rzate m\xE1s", "s\xE9 constante").
- Responde SIEMPRE en JSON: {"reply": "texto en Markdown con las 3 secciones y sus encabezados exactos", "suggestedActions": []}.

Datos conductuales:
${contextText}`;
      const noirSystemInstruction = `Eres el "Gran Alquimista Noir", un asistente inteligente de flujo de trabajo de los a\xF1os 1930. Tu prop\xF3sito es simplificar radicalmente la experiencia del usuario.
Analiza la solicitud del usuario junto con su estado actual de h\xE1bitos y progreso.

Responde SIEMPRE en formato JSON estructurado con el siguiente esquema:
{
  "reply": "Tu mensaje amigable en personaje de alquimista vintage (m\xE1ximo 3 p\xE1rrafos, usando met\xE1foras de tinta y transmutaci\xF3n)",
  "suggestedActions": [
    {
      "type": "create_habit" | "mark_complete" | "quick_routine",
      "label": "Nombre corto de la acci\xF3n (ej: 'Crear H\xE1bito: Caminar 20 min')",
      "payload": { ... } // Para create_habit: { title, category, frequency, xpReward, minLevel, icon }. Para mark_complete: { habitTitle }. Para quick_routine: array de h\xE1bitos.
    }
  ]
}

Si el usuario pide crear una rutina o mejorar sus h\xE1bitos, genera autom\xE1ticamente de 1 a 3 h\xE1bitos sugeridos en "suggestedActions".
Si el usuario dice que ya hizo una tarea (ej: "ya le\xED 10 p\xE1ginas"), incluye una acci\xF3n "mark_complete" con el nombre del h\xE1bito correspondiente.
Si no hay acciones directas, devuelve "suggestedActions": [].

${contextText}`;
      const systemInstruction = isReflection ? reflectionSystemInstruction : noirSystemInstruction;
      const promptText = isReflection ? "Genera el Reflejo Alqu\xEDmico completo a partir de los datos conductuales del usuario." : mode === "quick_routine" ? `Genera una rutina de 3 h\xE1bitos equilibrados y motivadores para simplificar mi d\xEDa sobre: ${message || "Productividad y Bienestar"}.` : mode === "streak_analysis" ? `Analiza mi rendimiento y da consejos pr\xE1cticos para mantener mis rachas diarias.` : message || "Hola Alquimista, \xBFc\xF3mo puedes simplificar mi rutina hoy?";
      const responseText = await generateContent(systemInstruction, promptText, isReflection ? 0.4 : 0.7);
      let parsedData = { reply: "Transmutaci\xF3n completada.", suggestedActions: [] };
      if (responseText) {
        try {
          parsedData = JSON.parse(responseText.trim());
        } catch {
          parsedData = { reply: responseText, suggestedActions: [] };
        }
      }
      return res.json(parsedData);
    } catch (err) {
      console.error("Error in assistant endpoint:", err);
      return res.status(500).json({
        error: err.message || "Error en el Asistente Alqu\xEDmico"
      });
    }
  });
  if (process.env.API_ONLY !== "true") {
    if (process.env.NODE_ENV !== "production") {
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa"
      });
      app.use(vite.middlewares);
    } else {
      const distPath = path.join(currentDir ?? process.cwd(), "dist");
      app.use(express.static(distPath));
      app.get("*", (req, res) => {
        res.sendFile(path.join(distPath, "index.html"));
      });
    }
  }
  const host = process.env.NODE_ENV === "production" ? "0.0.0.0" : "127.0.0.1";
  app.listen(PORT, host, () => {
    console.log(`Server listening on http://${host}:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.js.map
