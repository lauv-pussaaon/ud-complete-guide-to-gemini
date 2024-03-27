import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

import * as dotenv from "dotenv";
dotenv.config();

const API_KEY: string = process.env.API_KEY!;
const MODEL_NAME = "gemini-pro-vision";

const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({
    model: MODEL_NAME,
});

async function runPrompt(prompts: (string | ImagePart)[]) {
    const result = await model.generateContent(prompts);

    console.log(result.response.text());
}

type ImagePart = {
    inlineData: {
        data: string;
        mimeType: string;
    };
};

function generateImagePart(path: string, mimeType: string): ImagePart {
    return {
        inlineData: {
            data: Buffer.from(fs.readFileSync(path)).toString("base64"),
            mimeType: mimeType,
        },
    };
}

runPrompt([
    "What is in this image?",
    "What could be the next image scene if this was a sci-fi fantasy story",
    generateImagePart("sample-prompt-image.jpg", "image/jpeg"),
]);
