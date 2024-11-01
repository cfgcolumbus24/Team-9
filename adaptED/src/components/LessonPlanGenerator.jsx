import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import jsPDF from "jspdf";

const LessonPlanGenerator = () => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [result, setResult] = useState("");
  const [editableResult, setEditableResult] = useState("");

  const handleGenerateContent = async () => {
    try {
      const apiKey = import.meta.env.VITE_GEMINI_KEY;
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Create a lesson plan for teaching ${input1}. The lesson plan should be tailored for ${input2}. Include a clear objective, materials needed, a step-by-step outline, and suggestions for assessment. Make sure there are sections where the teacher can fill in specific details to customize the plan.`;
      console.log("Prompt:", prompt);
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
    doc.text(editableResult, 10, 10); // Add the text at position (10, 10)
    doc.save("Lesson_Plan.pdf"); // Save the document with the given filename
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Input 1"
        value={input1}
        onChange={(e) => setInput1(e.target.value)}
      />
      <input
        type="text"
        placeholder="Input 2"
        value={input2}
        onChange={(e) => setInput2(e.target.value)}
      />
      <button onClick={handleGenerateContent}>Generate Content</button>
      {result && (
        <div>
          <h2>Generated Lesson Plan (Editable)</h2>
          <textarea
            value={editableResult}
            onChange={handleEditChange}
            rows="10"
            cols="50"
            style={{ resize: "vertical", padding: "10px", fontSize: "16px" }}
          />
          <button onClick={handleExportPDF}>Export as PDF</button>
        </div>
      )}
    </div>
  );
};

export default LessonPlanGenerator;
