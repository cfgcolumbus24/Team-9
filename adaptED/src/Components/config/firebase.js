const firebase_key = import.meta.env.VITE_FIREBASE_KEY;
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

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
export const db = getFirestore(app);
export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then(async (result) => {
      const user = result.user;
      const name = result.user.displayName;
      const email = result.user.email;

      try {
        await setDoc(doc(db, "users", email), {
          name: name,
          email: email,
          signUpDate: new Date().toISOString(),
        });
        console.log("Teacher data successfully saved to Firestore!");
      } catch (error) {
        console.error("Error saving teacher data to Firestore:", error);
      }

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
    })
    .catch((error) => {
      console.log(error);
    });
};

export { auth };
