import React from "react";
import LessonPlanGenerator from "./components/LessonPlanGenerator";

import TeacherClassButton from './Components/TeacherClassButton'
import FieldPiece from './Components/FieldPiece'

function App() {
  
  return (
    <div>
      <FieldPiece></FieldPiece>
      <TeacherClassButton></TeacherClassButton>
      <h1>adaptED</h1>
      <LessonPlanGenerator />
    </div>
  );
};

export default App;
