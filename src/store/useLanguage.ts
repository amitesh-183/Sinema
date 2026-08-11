import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Language = {
  code: string;
  label: string;
  emoji: string;
};

export const LANGUAGES: Language[] = [
  { code: "en", label: "English", emoji: "🇺🇸" },
  { code: "hi", label: "Hindi", emoji: "🇮🇳" },
  { code: "bn", label: "Bengali", emoji: "🇮🇳" },
  { code: "te", label: "Telugu", emoji: "🇮🇳" },
  { code: "ta", label: "Tamil", emoji: "🇮🇳" },
  { code: "mr", label: "Marathi", emoji: "🇮🇳" },
  { code: "gu", label: "Gujarati", emoji: "🇮🇳" },
  { code: "pa", label: "Punjabi", emoji: "🇮🇳" },
  { code: "es", label: "Spanish", emoji: "🇪🇸" },
  { code: "fr", label: "French", emoji: "🇫🇷" },
  { code: "de", label: "German", emoji: "🇩🇪" },
  { code: "ja", label: "Japanese", emoji: "🇯🇵" },
  { code: "ko", label: "Korean", emoji: "🇰🇷" },
  { code: "pt", label: "Portuguese", emoji: "🇧🇷" },
  { code: "ar", label: "Arabic", emoji: "🇸🇦" },
];

export type LanguageStore = {
  language: string;
  captions: boolean;
  setLanguage: (language: string) => void;
  setCaptions: (captions: boolean) => void;
};

export const useLanguage = create<LanguageStore>()(
  persist(
    (set) => ({
      language: "en",
      captions: true,
      setLanguage: (language) => set(() => ({ language })),
      setCaptions: (captions) => set(() => ({ captions })),
    }),
    {
      name: "stream-language",
    },
  ),
);
