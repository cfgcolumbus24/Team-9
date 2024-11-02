const firebase_key = import.meta.env.VITE_FIREBASE_KEY;
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: firebase_key,
  authDomain: "adapted-cfg.firebaseapp.com",
  projectId: "adapted-cfg",
  storageBucket: "adapted-cfg.firebasestorage.app",
  messagingSenderId: "146570945971",
  appId: "1:146570945971:web:18b17ed2c55c0555e817c6",
  measurementId: "G-XJYDDSL5GD",
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};
