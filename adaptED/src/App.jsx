import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TeacherClassButton from './Components/TeacherClassButton'
import FieldPiece from './Components/FieldPiece'

function App() {
  
  return (
    <>
      <FieldPiece></FieldPiece>
      <TeacherClassButton></TeacherClassButton>
    </>
  )
}

export default App;