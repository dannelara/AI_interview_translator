"use server";
import { v4 as uuidv4 } from "uuid";
import { OpenaiBase } from "@/config/OpenaiBase";
import { Message } from "@/types/types";
import { MessageRole } from "@/constants/enums";

const openaiBase = new OpenaiBase();

export const generateTextFromAudio = async (base64Audio: string) => {
  if (!base64Audio) {
    throw new Error("No audio provided.");
  }

  const response = await openaiBase.generateTextFromAudio({ base64Audio });
  return response;
};

export const generateTranslatedMessage = async ({
  messages,
  latestMessage,
  language,
  channelId,
  userId,
}: {
  messages: Message[];
  latestMessage: string;
  language: string;
  channelId: string;
  userId: string;
}) => {
  const translated = await openaiBase.generateTranslation({
    text: latestMessage,
    language: language,
    isAi: false,
  });

  const transformedResponse: Message = {
    id: uuidv4(),
    language,
    original: translated.object.original,
    translated: translated.object.translation,
    createdAt: new Date(),
    conversationId: channelId,
    role: MessageRole.USER,
    userId,
  };

  return transformedResponse;

};
