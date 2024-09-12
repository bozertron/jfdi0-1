import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { llmName, message } = body;

    if (!llmName || !message) {
      return NextResponse.json({ error: "llmName and message are required" }, { status: 400 });
    }

    let response;

    switch (llmName.toLowerCase()) {
      case 'vee':
        response = await handleVeeRequest(message);
        break;
      case 'maestro':
        response = await handleMaestroRequest(message);
        break;
      case 'create':
        response = await handleCreateRequest(message);
        break;
      default:
        return NextResponse.json({ error: "Invalid LLM name" }, { status: 400 });
    }

    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    console.error("Error in LLM interaction:", error);
    return NextResponse.json({ error: "Failed to process LLM interaction" }, { status: 500 });
  }
}

async function handleVeeRequest(message: string) {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are Vee, an AI assistant focused on data analysis and visualization." },
      { role: "user", content: message }
    ],
  });

  return completion.choices[0].message.content;
}

async function handleMaestroRequest(message: string) {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are Maestro, an AI assistant specialized in project management and workflow optimization." },
      { role: "user", content: message }
    ],
  });

  return completion.choices[0].message.content;
}

async function handleCreateRequest(message: string) {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are Create, an AI assistant focused on generating creative content and ideas." },
      { role: "user", content: message }
    ],
  });

  return completion.choices[0].message.content;
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Allow': 'POST',
    },
  });
}