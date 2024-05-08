"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GenerateContentRequest, VertexAI } from "@google-cloud/vertexai";

const authOptions = {
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
  },
};

const vertexAI = new VertexAI({
  project: process.env.GOOGLE_PROJECT_ID ?? "",
  location: process.env.GOOGLE_LOCATION ?? "",
  googleAuthOptions: authOptions,
});

export async function getGeminiPDF(file_url: string, prompt: string) {
  const generativeModel = vertexAI.getGenerativeModel({
    model: "gemini-1.5-pro-preview-0409",
  });

  const filePart = {
    file_data: {
      file_uri: file_url,
      mime_type: "application/pdf",
    },
  };
  const textPart = {
    text: prompt,
  };

  const request = {
    contents: [{ role: "user", parts: [filePart, textPart] }],
  } as GenerateContentRequest;

  const resp = await generativeModel.generateContent(request);
  const contentResponse = await resp.response;
  console.log(JSON.stringify(contentResponse));
  return contentResponse;
}

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI ?? "");

export async function getGeminiCompletion(prompt: string, base64Image: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
  const formatted = base64Image.split(",")[1];
  const image = {
    inlineData: {
      data: formatted,
      mimeType: "image/jpeg",
    },
  };

  const result = await model.generateContent([prompt, image]);
  console.log(result.response.text());
  return result.response.text();
}
