import { MD3LightTheme, MD3DarkTheme as DarkTheme } from "react-native-paper";
import { Colors } from "./Colors";

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: Colors.primary,
    secondary: "#03dac4",
    secondaryContainer: Colors.primaryDrawer,
    onSecondaryContainer: "black",
    onBackground: "#d5a200",
    background: "#f0f0f0",
    onSurface:'black'
  },
};

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#bb86fc",
    secondaryContainer: Colors.primaryDark,
    onSecondaryContainer: "white",
    background: "#121212",
    surface: "#1e1e1e",
    text: "#ffffff",
  },
};
