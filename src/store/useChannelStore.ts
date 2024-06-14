import { create } from "zustand";
import { localS } from "./localStorage";

export type Channel = {
  channelId: string;
  userId: string | null;
};

type State = {
  channel: Channel;
  setChannel: (channel: Channel) => void;
};

export const useChannelStore = create<State>((set) => ({
  channel: localS<Channel>("channelId", true) || {
    channelId: "",
    userId: "",
  },
  setChannel: (channel: Channel) => {
    localStorage.setItem("channel", JSON.stringify(channel));
    set({ channel });
  },
}));
