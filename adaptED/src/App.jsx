import React from "react";
import LessonPlanGenerator from "./components/LessonPlanGenerator";

<<<<<<< HEAD
import TeacherClassButton from './Components/TeacherClassButton'
import FieldPiece from './Components/FieldPiece'
import PerClassRetentionTable from './Components/PerClassRetentionTable'
=======
import TeacherClassButton from './Components/TeacherClassButton';
>>>>>>> fa4db219090792dd82acfdc6055acfcc73142309

function App() {
  
  return (
    <div>
      <h1>adaptED</h1>
<<<<<<< HEAD
      <PerClassRetentionTable></PerClassRetentionTable>
=======

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

>>>>>>> fa4db219090792dd82acfdc6055acfcc73142309
      <LessonPlanGenerator />
    </div>
  );
};

export default App;
