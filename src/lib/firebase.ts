import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, initializeFirestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const isAppsEmpty = getApps().length === 0;
const app = isAppsEmpty ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

// Enable forced long polling to avoid connection failures in sandboxed/proxy environments
const firestoreSettings = {
  experimentalForceLongPolling: true
};

let firestore;
const dbId = (firebaseConfig as any).firestoreDatabaseId;

if (isAppsEmpty) {
  if (!dbId || dbId === "(default)") {
    firestore = initializeFirestore(app, firestoreSettings);
  } else {
    firestore = initializeFirestore(app, firestoreSettings, dbId);
  }
} else {
  if (!dbId || dbId === "(default)") {
    firestore = getFirestore(app);
  } else {
    firestore = getFirestore(app, dbId);
  }
}

export const db = firestore;
