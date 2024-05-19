"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI ?? "");

//models - gemini-pro-vision, gemini-1.5-flash-latest

export async function getGeminiVision(prompt: string, base64Image: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
  const body = [prompt] as any[];
  if (base64Image) {
    const formatted = base64Image.split(",")[1];
    const image = {
      inlineData: {
        data: formatted,
        mimeType: "image/jpeg",
      },
    };
    body.push(image);
  }

  const result = await model.generateContent(body);
  console.log(result.response.text());
  return result.response.text();
}
