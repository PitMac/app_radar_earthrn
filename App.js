import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./src/navigation/DrawerNavigator";
import { PaperProvider } from "react-native-paper";
import UpgradeProModal from "./src/components/UpgradeProModal";
import { useThemeStore } from "./src/stores/themeStore";
import LoginModal from "./src/components/LoginModal";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { registerForPushNotificationsAsync } from "./src/utils/PushNotifications";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { useUserStore } from "./src/stores/userStore";
import CustomAlert from "./src/components/CustomAlert";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function App() {
  const { theme, darkMode } = useThemeStore();
  const setExpoPushToken = useUserStore((state) => state.setExpoPushToken);

  useEffect(() => {
    let notificationListener;
    let responseListener;

    // Registrar token para notificaciones
    registerForPushNotificationsAsync().then((token) => {
      if (token) setExpoPushToken(token);
    });

    // Escuchar notificaciones mientras llegan
    notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        // aquí podrías actualizar algún estado si quieres mostrar en app
      }
    );

    // Escuchar cuando el usuario responde a la notificación
    responseListener = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        // manejar navegación o acciones según respuesta
      }
    );

    // Cleanup
    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);

  return (
    <PaperProvider theme={theme}>
      <StatusBar style={darkMode ? "light" : "dark"} />
      <CustomAlert />
      <LoginModal />
      <UpgradeProModal />
      <NavigationContainer theme={theme}>
        <DrawerNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}
