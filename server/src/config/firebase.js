import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let db = null;
let auth = null;
let isFirebaseInitialized = false;

/**
 * Initializes Firebase Admin SDK.
 * 
 * DESIGN PRINCIPLE:
 * In development, we can load a local serviceAccountKey.json file.
 * In cloud production (like Render), we load credentials via environment variables.
 * If credentials are not yet supplied, we warn gracefully so local setup can proceed.
 */
export const initializeFirebase = () => {
  if (isFirebaseInitialized) {
    return { admin, db, auth };
  }

  try {
    const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH 
      ? path.resolve(__dirname, '../../', process.env.FIREBASE_SERVICE_ACCOUNT_PATH)
      : path.resolve(__dirname, 'serviceAccountKey.json');

    if (fs.existsSync(serviceAccountPath)) {
      const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      console.log('✅ Firebase Admin SDK initialized using local service account file.');
      isFirebaseInitialized = true;
    } else if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          // Replace escaped newlines if passed through environment strings
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
      });
      console.log('✅ Firebase Admin SDK initialized using environment variables.');
      isFirebaseInitialized = true;
    } else {
      console.warn('⚠️  Firebase Admin credentials not found. Backend running in offline/stub mode until Milestone 3.');
      return { admin: null, db: null, auth: null, isMock: true };
    }

    db = admin.firestore();
    auth = admin.auth();
    return { admin, db, auth, isMock: false };
  } catch (error) {
    console.error('❌ Failed to initialize Firebase Admin SDK:', error.message);
    return { admin: null, db: null, auth: null, isMock: true, error: error.message };
  }
};

export { admin, db, auth };
