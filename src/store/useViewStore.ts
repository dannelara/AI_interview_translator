import { ViewE } from "@/constants/enums";
import { create } from "zustand";

type ViewStore = {
  view: ViewE;
  setView: (view: ViewE) => void;
};

export const useViewStore = create<ViewStore>((set) => ({
  view: ViewE.HOME,
  setView: (view) => set({ view }),
}));
