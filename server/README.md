# Transmute Sync Server

This small server accepts offline sync tasks from the browser and writes them to Firestore using the Firebase Admin SDK. It's intended to be deployed to Cloud Run (us-west1) or Cloud Functions.

Security model:
- The server requires a Firebase ID token (Authorization: Bearer <idToken>). The token is verified with the Admin SDK.
- Tasks are validated and sanitized server-side to avoid clients writing sensitive fields.

Deploy (Cloud Run, recommended)
1. Build the Docker image locally or with Cloud Build.
2. Deploy to Cloud Run in region `us-west1` with a service account that has Firestore permissions (roles/datastore.user or roles/firestone.user).

Local dev
- Set `GOOGLE_APPLICATION_CREDENTIALS` to a service account JSON (if not running in GCP).
- Install dependencies and run in dev mode:

  cd server
  npm install
  npm run dev

Files
- src/index.ts — Express server and sync handler
- tsconfig.json — TypeScript config
- package.json — dependencies and scripts

Notes
- The server writes to Firestore collections mapped from task.entity. Adjust `mapEntityToCollection()` if your schema differs.
- For production, consider adding rate-limiting, structured logs, and more strict payload validation.
