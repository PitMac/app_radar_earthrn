import { create } from "zustand";
import { darkTheme, lightTheme } from "../utils/Theme";

export const useThemeStore = create((set) => ({
  darkMode: false,
  toggleTheme: () => set((state) => ({ darkMode: !state.darkMode })),
  theme: darkTheme,
  setTheme: (darkMode) =>
    set({ darkMode, theme: darkMode ? darkTheme : lightTheme }),
}));
