import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "light" | "dark" | "system";

export type ThemeStore = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const useTheme = create(
  persist(
    (set) => ({
      theme: "light",
      setTheme: (theme: Theme) =>
        set((state) => ({
          theme,
        })),
    }),
    {
      name: "ui-theme",
    },
  ),
);
