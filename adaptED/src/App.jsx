import React from "react";
import LessonPlanGenerator from "./components/LessonPlanGenerator";

import TeacherClassButton from './Components/TeacherClassButton'
import FieldPiece from './Components/FieldPiece'
import PerClassRetentionTable from './Components/PerClassRetentionTable'

function App() {
  
  return (
    <div>
      <FieldPiece></FieldPiece>
      <TeacherClassButton></TeacherClassButton>
      <h1>adaptED</h1>
      <PerClassRetentionTable></PerClassRetentionTable>
      <LessonPlanGenerator />
    </div>
  );
};

export default App;
