import { openai } from "@ai-sdk/openai";
import { CoreMessage, generateObject, generateText } from "ai";
import { translationSchema } from "./schemas";
import fs from "fs";
import {
  defaultInstructions,
  instructions,
  translatonPrompt,
} from "./instructions";
import { Message } from "@/types/types";
import { MessageRole } from "@/constants/enums";
import OpenAI from "openai";

export class OpenaiBase {
  public async generateTranslation({
    text,
    language,
    isAi,
  }: {
    text: string;
    language: string;
    isAi: boolean;
  }) {
    return await generateObject({
      model: openai("gpt-4o"),
      schema: translationSchema,
      prompt: translatonPrompt
        .replace("<language>", language)
        .replace("<text>", text),
    });
  }

  public async generateResponse({
    messages,
    language,
    isAi,
  }: {
    messages: Message[];
    language: string;
    isAi: boolean;
  }) {
    const messagesTransformed = messages.map((message) => ({
      role: message.role === MessageRole.USER ? "user" : "assistant",
      content: message.translated,
    })) as any;

    // Since we are mocking a "swedish person on the other end we need to add the instructions in swedish".

    const swedishInstructions: CoreMessage | null = isAi
      ? {
          role: "assistant",
          content: `You must write in Swedish.`,
        }
      : null;

    return generateText({
      model: openai("gpt-4o"),
      messages: [
        {
          role: "assistant",
          content: defaultInstructions,
        },
        swedishInstructions,
        ...messagesTransformed,
      ].filter(Boolean),
    });
  }

  public async generateTextFromAudio({ base64Audio }: { base64Audio: string }) {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const audio = Buffer.from(base64Audio, "base64");
    const filePath = "tmp/input.wav";

    try {
      fs.writeFileSync(filePath, audio);

      const readStream = fs.createReadStream(filePath);

      const data = await openai.audio.transcriptions.create({
        file: readStream,
        model: "whisper-1",
      });

      fs.unlinkSync(filePath);

      return data;
    } catch (error) {
      console.error("Error processing audio:", error);
    }
  }
}
