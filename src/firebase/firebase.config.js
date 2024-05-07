/**
 * @fileOverview Firebase configuration and initialization module.
 * @module firebaseConfig
 */

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

/**
 * Firebase API key from environment variables.
 * @type {string}
 */
const firebaseApiKey = process.env.REACT_APP_FIREBASE_API_KEY;

/**
 * Firebase authentication domain from environment variables.
 * @type {string}
 */
const firebaseAuthDomain = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN;

/**
 * Firebase project ID from environment variables.
 * @type {string}
 */
const firebaseProjectId = process.env.REACT_APP_FIREBASE_PROJECT_ID;

/**
 * Firebase storage bucket from environment variables.
 * @type {string}
 */
const firebaseStorageBucket = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET;

/**
 * Firebase messaging sender ID from environment variables.
 * @type {string}
 */
const firebaseMessagingSenderId = process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID;

/**
 * Firebase app ID from environment variables.
 * @type {string}
 */
const firebaseAppId = process.env.REACT_APP_FIREBASE_APP_ID;

/**
 * Firebase configuration object.
 * @type {object}
 */
const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: firebaseAuthDomain,
  projectId: firebaseProjectId,
  storageBucket: firebaseStorageBucket,
  messagingSenderId: firebaseMessagingSenderId,
  appId: firebaseAppId
};

/**
 * Initialize Firebase app.
 * @constant {object}
 */
const app = initializeApp(firebaseConfig);

/**
 * Firebase authentication instance.
 * @constant {object}
 */
const auth = getAuth(app);

/**
 * Firebase Firestore instance.
 * @constant {object}
 */
const db = getFirestore(app);

export { auth, db };
