import { NextResponse } from "next/server";

export async function GET() {
  console.log('GET /session with key '+process.env.OPENAI_API_KEY)
  try {
    // const baseURL = `https://gateway.ai.cloudflare.com/v1/${process.env.ACCOUNT_ID}/${process.env.GATAWAY_ID}/openai`;
    const baseURL = "https://api.openai.com/v1/realtime/sessions";
    const response = await fetch(
      baseURL,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-realtime-preview-2025-06-03",
          // model: "gpt-4o-mini-realtime-preview-2024-12-17",
        }),
      }
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in /session:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
