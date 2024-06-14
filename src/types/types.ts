import { MessageRole } from "@/constants/enums";

export type Language = {
  language: string;
  country: string;
  code: string;
};

export type Message = {
  id: string;
  original: string;
  translated: string;
  language: string;
  createdAt: Date;
  conversationId: string;
  role: MessageRole;
  userId: string;
};

export type Conversation = {
  id: string;
  messages: Message[];
  createdAt: Date;
  language: string;
};
