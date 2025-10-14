import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./src/navigation/DrawerNavigator";
import { PaperProvider } from "react-native-paper";
import UpgradeProModal from "./src/components/UpgradeProModal";
import { useThemeStore } from "./src/stores/themeStore";
import LoginModal from "./src/components/LoginModal";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Onboarding from "./src/components/Onboarding";
import { registerForPushNotificationsAsync } from "./src/utils/PushNotifications";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { useUserStore } from "./src/stores/userStore";
import CustomAlert from "./src/components/CustomAlert";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

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
  const [showOnboarding, setShowOnboarding] = useState(null);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "741989100077-1cr5o5ts0jpsjp67bg2gt0ufm18cfqnd.apps.googleusercontent.com",
      iosClientId:
        "741989100077-skikooq060p69qmctgrug3d0csdo7nq8.apps.googleusercontent.com",
      profileImageSize: 150,
    });
  }, []);

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

    responseListener = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        // manejar navegación o acciones según respuesta
      }
    );

    AsyncStorage.getItem("onboarding_shown").then((value) => {
      setShowOnboarding(value !== "true");
    });

    // Cleanup
    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);

  const handleFinishOnboarding = async () => {
    await AsyncStorage.setItem("onboarding_shown", "true");
    setShowOnboarding(false);
  };

  if (showOnboarding === null) return null;

  if (showOnboarding) {
    return <Onboarding onFinish={handleFinishOnboarding} />;
  }

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
