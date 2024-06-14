import { Language } from "@/types/types";
import { create } from "zustand";
import { localS } from "./localStorage";

type SelectedLanguageStore = {
  selectedLanguage: Language | null;
  setSelectedLanguage: (selectedLanguage: Language) => void;
};

export const useSelectedLanguageStore = create<SelectedLanguageStore>(
  (set) => ({
    selectedLanguage: localS("selectedLanguage", true),
    setSelectedLanguage: (selectedLanguage) => {
      localStorage.setItem(
        "selectedLanguage",
        JSON.stringify(selectedLanguage)
      );
      set({ selectedLanguage });
    },
  })
);
