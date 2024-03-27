import {
    GoogleGenerativeAI,
    HarmBlockThreshold,
    HarmCategory,
} from "@google/generative-ai";
import * as dotenv from "dotenv";
dotenv.config();

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY: string = process.env.API_KEY!;

const genAI = new GoogleGenerativeAI(API_KEY);

const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
];
const model = genAI.getGenerativeModel({
    model: MODEL_NAME,
    generationConfig: { temperature: 0.9, maxOutputTokens: 10 },
    safetySettings,
});

async function runPrompt(textPrompts: string[]) {
    const result = await model.generateContent(textPrompts);

    console.log(result.response.text());
}

const textPrompts = ["How to make the world full of love and hope"];

runPrompt(textPrompts);
