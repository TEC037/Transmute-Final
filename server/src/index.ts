import express from 'express';
import cors from 'cors';
import admin from 'firebase-admin';

// If running locally, set GOOGLE_APPLICATION_CREDENTIALS env var to your service account JSON
// In Cloud Run / Cloud Functions, ADC will be used automatically when the service account is attached.
if (!admin.apps.length) {
  try {
    admin.initializeApp();
  } catch (e) {
    console.warn('Firebase admin initializeApp issue', e);
  }
}

const db = admin.firestore();
const app = express();
app.use(cors());
app.use(express.json());

// Helper: sanitize payload to avoid writing sensitive fields from client
const SENSITIVE_FIELDS = new Set(['roles', 'isAdmin', 'createdAt', 'updatedAt', 'lastLogin']);
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

// Middleware to verify Firebase ID token and attach decoded token to req.auth
async function verifyToken(req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    const authHeader = String(req.header('authorization') || '');
    if (!authHeader.startsWith('Bearer ')) return res.status(401).json({ error: 'Missing or invalid Authorization header' });
    const idToken = authHeader.slice(7);
    const decoded = await admin.auth().verifyIdToken(idToken);
    (req as any).auth = decoded; // { uid, email, ... }
    return next();
  } catch (err) {
    console.warn('Token verify failed', err);
    return res.status(401).json({ error: 'Invalid ID token' });
  }
}

function mapEntityToCollection(entity: string) {
  switch (entity) {
    case 'habit':
      return 'habits';
    case 'user':
    case 'users':
      return 'users';
    case 'card':
    case 'cards':
      return 'cards';
    case 'user_images':
      return 'user_images';
    default:
      return entity;
  }
}

app.post('/api/sync', verifyToken, async (req, res) => {
  const task = req.body;
  if (!task || !task.entity || !task.action || typeof task.id === 'undefined') {
    return res.status(400).json({ error: 'Invalid task payload' });
  }

  const uid = (req as any).auth?.uid;
  const entity = String(task.entity);
  const action = String(task.action);
  const docId = String(task.id);
  const payload = task.payload ?? null;

  // Security checks
  if ((entity === 'users' || entity === 'user') && docId !== uid) {
    return res.status(403).json({ error: 'Cannot modify other user profiles' });
  }
  if (payload && payload.userId && payload.userId !== uid) {
    return res.status(403).json({ error: 'Payload userId mismatch' });
  }

  try {
    const colName = mapEntityToCollection(entity);
    const col = db.collection(colName);

    if (action === 'create' || action === 'update') {
      const safePayload = sanitizePayload(payload);
      // enforce server-side userId for user-scoped collections when missing
      if (colName === 'user_images' && !safePayload.userId) {
        safePayload.userId = uid;
      }
      await col.doc(docId).set({ ...safePayload, updatedAt: admin.firestore.FieldValue.serverTimestamp() }, { merge: true });
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

// Health check
app.get('/healthz', (_req, res) => res.status(200).send('ok'));

const port = Number(process.env.PORT || 8080);
app.listen(port, () => console.log(`sync server listening on ${port}`));

export default app;
