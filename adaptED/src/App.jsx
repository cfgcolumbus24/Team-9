import React from "react";
import LessonPlanGenerator from "./components/LessonPlanGenerator";

import TeacherClassButton from './Components/TeacherClassButton';

function App() {
  
  return (
    <div>
      <h1>adaptED</h1>

      <div>
      <h2>Your Classes</h2>
      <TeacherClassButton 
                className="Math 101" 
                description="Introduction to Algebra" 
            />
      
      <TeacherClassButton 
                className="Math 101" 
                description="Introduction to Algebra" 
            />
      
      <TeacherClassButton 
                className="Math 101" 
                description="Introduction to Algebra" 
            />
      
      <TeacherClassButton 
                className="Math 101" 
                description="Introduction to Algebra" 
            />
      </div>

      <LessonPlanGenerator />
    </div>
  );
};

export default App;
