import { NextResponse, NextRequest } from "next/server";
import { createChat } from "completions";
import { doc, setDoc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "@/common/firebase";
import { v4 as uuidv4 } from "uuid";

const db = getFirestore(app);

export async function GET(req: NextRequest) {
  const msg = req.nextUrl.searchParams.get("msg");
  const sessionId = req.nextUrl.searchParams.get("sessionId");

  if (!msg || !sessionId) {
    return NextResponse.json(
      { error: "Missing msg or sessionId parameter" },
      { status: 400 }
    );
  }

  try {
    const chat = createChat({
      apiKey: "sk-proj-m5F97TxvGplJe3a2yfloT3BlbkFJG1TEpMpZ3ms6QfONLsMT",
      model: "gpt-3.5-turbo",
    });

    await chat.sendMessage("Ping");
    const response = await chat.sendMessage(
      `Proszę odpowiedziec na pytanie:(${msg}). Postaraj się pomóc na każdy możliwy sposób. Odpowiadasz po polsku.`,
      {
        expect: {
          schema: {
            additionalProperties: false,
            type: "object",
            properties: {
              response: { type: "string" },
            },
            required: [],
          },
        },
      }
    );

    // Save user message
    const userMessage = {
      content: msg,
      role: "user",
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };

    // Save assistant response
    const assistantMessage = {
      content: response.content.response,
      role: "assistant",
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };

    // Get existing session or create new one
    const sessionRef = doc(db, "publicAssistantSessions", sessionId);
    const sessionDoc = await getDoc(sessionRef);

    let messages = [];
    if (sessionDoc.exists()) {
      messages = sessionDoc.data().messages || [];
    }

    // Add new messages
    messages.push(userMessage, assistantMessage);

    // Save session
    await setDoc(sessionRef, {
      messages: messages,
      lastUpdated: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        status: "success",
        response: response.content.response,
        sessionId: sessionId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in publicAssistant:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
