import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// This initializes the Gemini AI with your API Key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { topic } = await req.json(); // [cite: 63-66]
    
    if (!topic) {
      return NextResponse.json({ error: "Please enter a topic to continue." }, { status: 400 }); // [cite: 58]
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    // This is the instruction we send to the AI [cite: 38, 42]
    const prompt = `Explain the topic "${topic}" in simple terms for a student.`; 
    
    const result = await model.generateContent(prompt);
    const explanation = result.response.text();

    return NextResponse.json({ explanation }); // [cite: 67-70]
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate explanation. Try again." }, { status: 500 }); // [cite: 56]
  }
}