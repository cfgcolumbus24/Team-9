import React from "react";
import LessonPlanGenerator from "./components/LessonPlanGenerator";
import "./App.css";
import { signInWithGoogle } from "./components/config/firebase";

const App = () => {
  return (
    <div>
      <h1>adaptED</h1>
      <LessonPlanGenerator />
      <button
        onClick={signInWithGoogle}
        type="button"
        class="login-with-google-btn"
      >
        Sign In With Google
      </button>
    </div>
  );
};

export default App;
