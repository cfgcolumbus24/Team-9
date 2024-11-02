import React from "react";
import LessonPlanGenerator from "./components/LessonPlanGenerator";

import TeacherClassButton from './Components/TeacherClassButton'
import FieldPiece from './Components/FieldPiece'
import PerClassRetentionTable from './Components/PerClassRetentionTable'

function App() {
  
  return (
    <div>
      <TeacherClassButton></TeacherClassButton>
      <PerClassRetentionTable></PerClassRetentionTable>
      <LessonPlanGenerator></LessonPlanGenerator>
    </div>
  );
};

export default App;