import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json();

  try {
    const result = await generateText({
      model: google("models/gemini-2.0-flash-exp"),
      prompt: prompt,
    });

    return Response.json({ content: result.text });
  } catch (error) {
    console.error("Error:", error);
    return Response.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}
