import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./src/navigation/DrawerNavigator";
import { PaperProvider } from "react-native-paper";
import UpgradeProModal from "./src/components/UpgradeProModal";
import { useThemeStore } from "./src/stores/themeStore";
import LoginModal from "./src/components/LoginModal";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const { theme, darkMode } = useThemeStore();
  return (
    <PaperProvider theme={theme}>
      <StatusBar style={darkMode ? "light" : "dark"} />
      <LoginModal />
      <UpgradeProModal />
      <NavigationContainer theme={theme}>
        <DrawerNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}
