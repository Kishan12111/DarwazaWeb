import { NextResponse } from "next/server";
import { generateGeminiContent } from "@/configs/AiModel";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const result = await generateGeminiContent("EE2009.pdf", prompt);
    return NextResponse.json({ result });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
