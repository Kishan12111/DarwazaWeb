import fs from "fs";
import path from "path";
import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) throw new Error("Missing GEMINI_API_KEY");

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export async function generateGeminiContent(fileName, prompt) {
  try {
    const filePath = path.join(process.cwd(), "content", fileName);

    if (!fs.existsSync(filePath)) {
      throw new Error(`File does not exist: ${filePath}`);
    }

    const pdfBuffer = fs.readFileSync(filePath);
    const base64Data = Buffer.from(pdfBuffer).toString("base64");

    const contents = [
      { text: prompt },
      { inlineData: { mimeType: "application/pdf", data: base64Data } }
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents
    });

    console.log("FULL GEMINI RESPONSE:");
    console.log(response.text);

    return response.text;
  } catch (error) {
    console.error("Error generating Gemini content:", error);
    throw error;
  }
}
