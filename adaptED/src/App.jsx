import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Retention from "./pages/Retention";
import LessonPlanner from "./pages/LessonPlanner";
import TeacherClassButton from "./components/TeacherClassButton";
import PerClassRetentionTable from "./components/PerClassRetentionTable";
import LessonPlanGenerator from "./components/LessonPlanGenerator";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/retention" element={<Retention />} />
          <Route path="/lessonplanner" element={<LessonPlanner />} />
        </Routes>
      </Router>

      <TeacherClassButton></TeacherClassButton>
      <PerClassRetentionTable></PerClassRetentionTable>
      <LessonPlanGenerator></LessonPlanGenerator>
    </div>
  );
}

export default App;
