import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import jsPDF from "jspdf";


const LessonPlanGenerator = () => {
  const [whatToTeachInput, setWhatToTeachInput] = useState("");
  const [whoIsAttendingInput, setWhoIsAttendingInput] = useState("");
  const [result, setResult] = useState("");
  const [editableResult, setEditableResult] = useState("");


  const handleGenerateContent = async () => {
    try {
      const apiKey = import.meta.env.VITE_GEMINI_KEY;
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


      const prompt = `
      Create a structured lesson plan for teaching **[input1: specific topic, such as 'basic algebra' or 'the water cycle']** to **[input2: target audience, such as '7th-grade students' or 'beginner ESL adults']**. Begin by specifying the subject and grade level, as well as the topic and estimated time for the lesson. Next, list 2-3 specific learning objectives that describe what students should be able to understand or accomplish by the end of the lesson. Provide a list of essential materials needed for the lesson, noting any optional materials that could further enhance understanding.
      
      In the lesson procedure, break down the plan into five sections. Start with an Introduction (5 minutes) that uses a relatable, real-world scenario to introduce the main concept. In the Core Concepts section (10 minutes), introduce key terms or principles through clear explanations and examples. For Guided Practice (15 minutes), describe a collaborative activity where students work in pairs or groups to practice the concept with sample problems. Include Independent Practice (10 minutes) with individual exercises to reinforce the lesson. Finish with a brief Assessment (5 minutes) to gauge students' understanding, such as a quick worksheet check or observing their explanations.
      
      Add a section on Differentiation, detailing strategies for supporting students at different ability levels, such as simplifying problems for those who need extra help or adding challenges for advanced students. Include Adaptations that consider technology or other adjustments, like online games or simulations, to suit different learning styles. Finally, describe the methods you will use to assess students' understanding formally and informally, such as worksheet collection or real-time observation. Keep your explanations and examples clear to ensure students are engaged, understand the material, and can apply what they've learned.
      `;
      const response = await model.generateContent(prompt);


      const generatedText = response.response.text();
      setResult(generatedText);
      setEditableResult(generatedText);
    } catch (error) {
      console.error("Error generating content:", error);
      setResult("Error generating content");
    }
  };


  const handleEditChange = (e) => {
    setEditableResult(e.target.value);
  };


  const handleExportPDF = () => {
    const doc = new jsPDF();
    const lineHeight = 10;
    const marginLeft = 10;
    const marginTop = 10;
    const maxLineWidth = doc.internal.pageSize.width - marginLeft * 2;
    const maxPageHeight = doc.internal.pageSize.height - marginTop * 2;
   
    const lines = doc.splitTextToSize(editableResult, maxLineWidth);
    let cursorY = marginTop;
   
    lines.forEach((line) => {
      if (cursorY + lineHeight > maxPageHeight) {
        doc.addPage();
        cursorY = marginTop;
      }
      doc.text(line, marginLeft, cursorY);
      cursorY += lineHeight;
    });
   
    doc.save("Lesson_Plan.pdf");
  };


  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-8 text-gray-800">Lesson Plan Generator</h1>
     
      <div className="w-full max-w-md space-y-4">
        <input
          type="text"
          placeholder="What to Teach"
          value={whatToTeachInput}
          onChange={(e) => setWhatToTeachInput(e.target.value)}
          className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
       
        <input
          type="text"
          placeholder="Who is Attending"
          value={whoIsAttendingInput}
          onChange={(e) => setWhoIsAttendingInput(e.target.value)}
          className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
       
        <button
          onClick={handleGenerateContent}
          className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-200 ease-in-out"
        >
          Generate Content
        </button>
      </div>


      {result && (
        <div className="w-full max-w-2xl mt-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Generated Lesson Plan (Editable)</h2>
         
          <textarea
            value={editableResult}
            onChange={handleEditChange}
            rows="10"
            className="w-full p-4 text-gray-800 border border-gray-300 rounded-lg shadow-sm resize-vertical focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
         
          <button
            onClick={handleExportPDF}
            className="w-full mt-4 py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition duration-200 ease-in-out"
          >
            Export as PDF
          </button>
        </div>
      )}
    </div>
  );
};


export default LessonPlanGenerator
