import { DefaultTheme, MD3DarkTheme as DarkTheme } from "react-native-paper";

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#6200ee",
    accent: "#03dac4",
    background: "#ffffff",
    surface: "#f6f6f6",
    text: "#000000",
  },
};

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#bb86fc",
    accent: "#03dac6",
    background: "#121212",
    surface: "#1e1e1e",
    text: "#ffffff",
  },
};
