import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./src/navigation/DrawerNavigator";
import { PaperProvider } from "react-native-paper";
import UpgradeProModal from "./src/components/UpgradeProModal";
import { useThemeStore } from "./src/stores/themeStore";

export default function App() {
  const { theme } = useThemeStore();
  return (
    <PaperProvider theme={theme}>
      <UpgradeProModal />
      <NavigationContainer theme={theme}>
        <DrawerNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}
