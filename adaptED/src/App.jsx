import React, { useState, useEffect } from "react";
import LessonPlanGenerator from "./components/LessonPlanGenerator";
import TeacherClassButton from "./components/TeacherClassButton";
import TeacherProfile from "./components/TeacherProfile";
import "./App.css";
import { signInWithGoogle, auth } from "./components/config/firebase";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setIsAuthenticated(!!user);
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="sign-in-page">
        <h1>Welcome to adaptED</h1>
        <button
          onClick={signInWithGoogle}
          type="button"
          className="login-with-google-btn"
        >
          Sign In With Google
        </button>
      </div>
    );
  }

  const classes = [
    { className: "Math 101", description: "Introduction to Algebra" },
    { className: "Math 102", description: "Geometry Basics" },
    { className: "Math 103", description: "Intermediate Algebra" },
    { className: "Math 104", description: "Calculus I" },
  ];

  return (
    <div>
      <h1>adaptED</h1>
      <div>
        <TeacherProfile />
        <h2>Your Classes</h2>
        {classes.map((course, index) => (
          <TeacherClassButton
            key={index}
            className={course.className}
            description={course.description}
          />
        ))}
      </div>
      <LessonPlanGenerator />
    </div>
  );
}

export default App;
