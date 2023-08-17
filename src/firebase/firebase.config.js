'use strict'

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYK4tnaDGZgJiX9DqmA7AEJNXsGfRAZTM",
  authDomain: "eisc-metaverse.firebaseapp.com",
  projectId: "eisc-metaverse",
  storageBucket: "eisc-metaverse.appspot.com",
  messagingSenderId: "638980764121",
  appId: "1:638980764121:web:f2db65bb02f8179a9ea9c8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth
const auth = getAuth(app);

// Export firestore
const db = getFirestore(app);

export { auth, db };
