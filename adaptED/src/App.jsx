import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TeacherProfile from "./components/TeacherProfile";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Retention from "./pages/Retention";
import LessonPlanner from "./pages/LessonPlanner";
import DisplayLessons from "./Components/DisplayLessons"; // Assuming DisplayLessons is in the pages folder
import LessonDetail from "./pages/LessonDetail"; // Assuming LessonDetail is in the pages folder
import { signInWithGoogle, auth } from "./Components/config/firebase";
import "./App.css";
import Profile from "./pages/Profile";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
        <h1 className="text-4xl font-bold text-[#2E1A47] mb-6"> {/* Pantone 2695 C */}
          Welcome to adaptED
        </h1>
        <button
          onClick={signInWithGoogle}
          type="button"
          className="flex items-center justify-center px-6 py-3 text-lg font-medium text-white bg-[#5D3A73] rounded-md shadow-md hover:bg-[#7A5C91] focus:outline-none focus:ring-2 focus:ring-[#00BFB3] focus:ring-offset-2"
        > {/* Darker purple, light purple hover, Pantone 326 C focus */}
          <span className="mr-2">🔍</span> {/* Replace with Google icon if available */}
          Sign In With Google
        </button>
      </div>
    );
  }

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/retention" element={<Retention />} />
          <Route path="/lessonplanner" element={<LessonPlanner />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/lessons" element={<DisplayLessons />} />
          <Route path="/lesson/:lessonId" element={<LessonDetail />} /> {/* Route for lesson detail */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
