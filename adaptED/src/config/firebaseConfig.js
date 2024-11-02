// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "adapted-cfg.firebaseapp.com",
  projectId: "adapted-cfg",
  storageBucket: "adapted-cfg.firebasestorage.app",
  messagingSenderId: "146570945971",
  appId: "G-XJYDDSL5GD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
