import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const App = () => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [result, setResult] = useState("");

  const handleGenerateContent = async () => {
    try {
      const apiKey = import.meta.env.VITE_GEMINI_KEY;  // Use import.meta.env for Vite
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Combine input1 and input2 as the prompt
      const prompt = `${input1} ${input2}`;
      console.log("Prompt:", prompt);
      const response = await model.generateContent(prompt);
      setResult(response.response.text());
    } catch (error) {
      console.error("Error generating content:", error);
      setResult("Error generating content");
    }
  };

  return (
    <div>
      <h1>Google Gemini Content Generator</h1>
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
      {result && <p>Result: {result}</p>}
    </div>
  );
};

export default App;
