import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const LessonPlanGenerator = () => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [result, setResult] = useState("");
  const [editableResult, setEditableResult] = useState("");

  const handleGenerateContent = async () => {
    try {
      const apiKey = import.meta.env.VITE_GEMINI_KEY; // Use import.meta.env for Vite
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Create a lesson plan for teaching ${input1}. The lesson plan should be tailored for ${input2}. Include a clear objective, materials needed, a step-by-step outline, and suggestions for assessment. Make sure there are sections where the teacher can fill in specific details to customize the plan.`;
      console.log("Prompt:", prompt);
      const response = await model.generateContent(prompt);

      // Set both result and editableResult with the output from the model
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

  return (
    <div>
      <input
        type="text"
        placeholder="What to Teach"
        value={input1}
        onChange={(e) => setInput1(e.target.value)}
      />
      <input
        type="text"
        placeholder="Who's Attending"
        value={input2}
        onChange={(e) => setInput2(e.target.value)}
      />
      <button onClick={handleGenerateContent}>Generate Lesson Plan</button>
      {result && (
        <div>
          <h2>Generated Lesson Plan</h2>
          <textarea
            value={editableResult}
            onChange={handleEditChange}
            rows="10"
            cols="50"
            style={{ resize: "vertical", padding: "10px", fontSize: "16px" }}
          />
        </div>
      )}
    </div>
  );
};

export default LessonPlanGenerator;
