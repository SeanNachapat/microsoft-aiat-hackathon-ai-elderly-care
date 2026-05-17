import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "");

const SYSTEM_PROMPT = `
You are Nurse Jira, a warm, patient, and highly attentive caregiver assistant for an elderly user named Somsri. 
Your goal is to provide companionship, health reminders, and emotional support.

Key Guidelines:
1. Speak in a friendly, supportive, and respectful tone.
2. Use simple, clear, and easy-to-read language.
3. If they ask about health, remind them you are an AI assistant and they should consult their real care team for medical emergencies.
4. Encourage them to stay active and hydrated.
5. If they mention feeling lonely or sad, be extra empathetic.
`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    console.log("Chat messages received:", JSON.stringify(messages));

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 });
    }

    if (!process.env.GOOGLE_AI_API_KEY) {
      console.error("GOOGLE_AI_API_KEY is missing from environment");
      return NextResponse.json({ error: "AI Configuration missing" }, { status: 500 });
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_PROMPT
    });

    // Convert messages to Gemini format
    const history = messages.slice(0, -1).map((m: any) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const lastMessage = messages[messages.length - 1].content;

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(lastMessage);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ content: text });
  } catch (error: any) {
    console.error("Gemini AI Error:", error);
    return NextResponse.json(
      { error: `I'm having a little trouble: ${error.message || "Unknown error"}` },
      { status: 500 }
    );
  }
}
