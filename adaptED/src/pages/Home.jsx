// src/pages/Home.jsx
import React from "react";
import LessonPlanGenerator from "../components/LessonPlanGenerator";
import TeacherClassButton from "../components/TeacherClassButton";
import FieldPiece from "../components/FieldPiece";
import PerClassRetentionTable from "../components/PerClassRetentionTable";

const Home = () => {
  return (
    <div>
      <FieldPiece />
      <TeacherClassButton />
      <h1>adaptED</h1>
      <PerClassRetentionTable />
      <LessonPlanGenerator />
    </div>
  );
};

export default Home;
