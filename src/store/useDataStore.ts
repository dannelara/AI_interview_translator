import { Conversation, Message } from "@/types/types";
import { create } from "zustand";
import { localS } from "./localStorage";

type DataStore = {
  conversations: Conversation[];
  addConversation: (conversation: Conversation) => void;
  addMessage: (conversationId: string, message: Message) => void;
  getConversation: (conversationId: string) => Conversation | undefined;
};

export const useDataStore = create<DataStore>((set) => ({
  conversations: localS("conversations", true) || [],
  addConversation: (conversation) => {
    const convesations = localS<[]>("conversations", true) || [];

    localStorage.setItem(
      "conversations",
      JSON.stringify([...convesations, conversation])
    );

    set((state) => ({
      conversations: [...convesations, conversation],
    }));
  },
  addMessage: (conversationId, message) => {
    const conversations = localS<[]>("conversations", true) || [];

    const updatedConversations = conversations.map(
      (conversation: Conversation) =>
        conversation.id === conversationId
          ? {
              ...conversation,
              messages: [...conversation.messages, message],
            }
          : conversation
    );

    localStorage.setItem("conversations", JSON.stringify(updatedConversations));

    set((state) => ({
      conversations: updatedConversations,
    }));
  },
  getConversation: (conversationId) => {
    const conversations = localS<[]>("conversations", true) || [];

    return conversations.find(
      (conversation: Conversation) => conversation.id === conversationId
    );
  },
}));
