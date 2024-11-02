import React, { useState, useEffect } from "react";
import TeacherProfile from "./components/TeacherProfile";
import "./App.css";
import { signInWithGoogle, auth } from "./components/config/firebase";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Retention from "./pages/Retention";
import LessonPlanner from "./pages/LessonPlanner";
import LessonPlanGenerator from "./components/LessonPlanGenerator";
import PerClassRetentionTable from "./components/PerClassRetentionTable";
import TeacherClassButton from "./components/TeacherClassButton";

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
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/retention" element={<Retention />} />
          <Route path="/lessonplanner" element={<LessonPlanner />} />
          <Route path="/profile" element={<TeacherProfile />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
