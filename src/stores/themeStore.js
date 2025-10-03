import { create } from "zustand";
import { darkTheme, lightTheme } from "../utils/Theme";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useThemeStore = create(
  persist(
    (set, get) => ({
      darkMode: false,
      theme: lightTheme,
      toggleTheme: () => {
        const newDarkMode = !get().darkMode;
        set({
          darkMode: newDarkMode,
          theme: newDarkMode ? darkTheme : lightTheme,
        });
      },
      setTheme: (darkMode) =>
        set({ darkMode, theme: darkMode ? darkTheme : lightTheme }),
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
