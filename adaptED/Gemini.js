import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

console.log("GEMINI_KEY:", process.env.GEMINI_KEY);

async function generateLessonPlan(whatToTeach, whosAttending) {
  try {
    const prompt = `Create a lesson plan for teaching ${whatToTeach}. The lesson plan should be tailored for ${whosAttending}. Include a clear objective, materials needed, a step-by-step outline, and suggestions for assessment. Make sure there are sections where the teacher can fill in specific details to customize the plan.`;

    const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    console.log("Generated Lesson Plan:", result.response.text());
  } catch (error) {
    console.error("Error generating content:", error);
  }
}

generateLessonPlan(
  "basic addition for first graders",
  "a group of 20 first-grade students with varying math abilities"
);
