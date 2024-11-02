import React, { useState, useEffect } from "react";
import LessonPlanGenerator from "./components/LessonPlanGenerator";
import TeacherClassButton from "./components/TeacherClassButton";
import "./App.css";
import { signInWithGoogle, auth } from "./components/config/firebase"; // Ensure you have auth imported

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [teacherInfo, setTeacherInfo] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setIsAuthenticated(!!user);
        setUser({
          name: user.displayName,
          email: user.email,
        });

        try {
          const teacherDocRef = doc(db, "USERS", user.email);
          const teacherDoc = await getDoc(teacherDocRef);

          if (teacherDoc.exists()) {
            setTeacherInfo(teacherDoc.data());
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching teacher data from Firestore:", error);
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
        setTeacherInfo(null);
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

  // Main content after signing in
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
        <h2>Your Classes</h2>
        {classes.map((course, index) => (
          <TeacherClassButton
            key={index}
            className={course.className}
            description={course.description}
          />
        ))}
        {user && (
          <div>
            <h3>{user.name}</h3>
            <h3>{user.email}</h3>
          </div>
        )}
      </div>
      <LessonPlanGenerator />
    </div>
  );
}

export default App;
