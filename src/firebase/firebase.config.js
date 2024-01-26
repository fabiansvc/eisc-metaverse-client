'use strict'

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseApiKey = process.env.REACT_APP_FIREBASE_API_KEY;
const firebaseAuthDomain = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN;
const firebaseProjectId = process.env.REACT_APP_FIREBASE_PROJECT_ID;
const firebaseStorageBucket = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET;
const firebaseMessagingSenderId = process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID;
const firebaseAppId = process.env.REACT_APP_FIREBASE_APP_ID;

// Firebase configuration
const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: firebaseAuthDomain,
  projectId: firebaseProjectId,
  storageBucket: firebaseStorageBucket,
  messagingSenderId: firebaseMessagingSenderId,
  appId: firebaseAppId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth
const auth = getAuth(app);

// Export firestore
const db = getFirestore(app);

export { auth, db };
