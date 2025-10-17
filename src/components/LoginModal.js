import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  Modal,
  Portal,
  Button,
  IconButton,
  TextInput,
  Text,
} from "react-native-paper";
import { useTheme } from "react-native-paper";
import { Colors } from "../utils/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Image } from "expo-image";
import instance from "../utils/Instance";
import * as AuthSession from "expo-auth-session";
import { useUserStore } from "../stores/userStore";
import { showAlert } from "./CustomAlert";
import CustomLoader from "./CustomLoader";
import * as Google from "expo-auth-session/providers/google";
import { StatusBar } from "expo-status-bar";
import i18n from "../i18n";

let showLoginFn;

export function showLoginModal() {
  if (showLoginFn) showLoginFn(true);
}

export default function LoginModal() {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { expoPushToken } = useUserStore.getState();
  const [showRegister, setShowRegister] = useState(false);
  const [seePassword, setSeePassword] = useState(false);
  const [formFields, setFormFields] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId:
      "741989100077-1cr5o5ts0jpsjp67bg2gt0ufm18cfqnd.apps.googleusercontent.com",
    iosClientId: "TU_IOS_CLIENT_ID.apps.googleusercontent.com",
    androidClientId:
      "741989100077-skikooq060p69qmctgrug3d0csdo7nq8.apps.googleusercontent.com",
    redirectUri: AuthSession.makeRedirectUri({
      scheme: "com.radarrearth.app",
      useProxy: true,
    }),
  });

  const [keyboardOffset, setKeyboardOffset] = useState(0);

  useEffect(() => {
    showLoginFn = setVisible;
    return () => {
      showLoginFn = null;
    };
  }, []);

  const hideModal = () => {
    setVisible(false);
    setFormFields({ email: "", password: "", username: "" });
  };

  const hideRegisterModal = () => {
    setShowRegister(false);
    setSeePassword(false);
    setFormFields({ email: "", password: "", username: "" });
  };

  const handleChange = (field) => (value) =>
    setFormFields({ ...formFields, [field]: value });

  const handleloginGoogle = async () => {
    try {
      const result = await promptAsync();

      if (result.type === "success" && result.params.code) {
        const { data } = await instance.post("/auth/google", {
          code: result.params.code,
          redirectUri: "com.radarrearth.app://",
          expoPushToken,
        });

        console.log("Respuesta del backend:", data);
      } else {
        console.log("Login cancelado o sin código", result);
      }
    } catch (error) {
      console.log("Error login Google:", error);
    }
  };

  const handleLogin = async () => {
    const { email, password } = formFields;
    if (!email.trim() || !password.trim()) {
      showAlert({
        title: i18n.t("login.errorTitle"),
        message: i18n.t("login.errorEmptyFields"),
      });
      return;
    }

    try {
      const response = await instance.post("/auth/login", {
        email,
        password,
        expoPushToken,
      });

      const userData = response.data;

      useUserStore.getState().setUser(userData);
    } catch (error) {
      console.log("Error login:", error);
      showAlert({
        title: i18n.t("login.errorTitle"),
        message: i18n.t("login.errorLogin"),
      });
    }
  };

  const handleRegister = async () => {
    const { username, email, password } = formFields;

    if (!username.trim() || !email.trim() || !password.trim()) {
      showAlert({
        title: i18n.t("login.errorTitle"),
        message: i18n.t("login.errorEmptyFields"),
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showAlert({
        title: i18n.t("login.errorTitle"),
        message: i18n.t("login.errorInvalidEmail"),
      });
      return;
    }

    try {
      const response = await instance.post("/auth/register", {
        username,
        email,
        password,
      });

      setFormFields({ username: "", email: "", password: "" });
      hideRegisterModal();
      showAlert({
        title: i18n.t("login.successTitle"),
        message: i18n.t("login.successRegister"),
      });
    } catch (error) {
      showAlert({
        title: i18n.t("login.errorTitle"),
        message:
          error?.response?.data?.message || i18n.t("login.errorRegister"),
      });
    }
  };

  return (
    <Portal>
      <CustomLoader loading={loading} />
      <StatusBar style={"light"} />
      <Modal
        visible={visible}
        onDismiss={hideModal}
        dismissable={false}
        contentContainerStyle={{
          flex: 1,
          backgroundColor: theme.colors.primary,
          marginBottom: keyboardOffset,
        }}
      >
        <View style={styles.headerContainer}>
          <IconButton
            icon="arrow-left"
            size={24}
            onPress={hideModal}
            style={styles.backButton}
            iconColor="white"
          />
          <View style={styles.headerContent}>
            <View style={styles.logoContainer}>
              <Image
                style={styles.logo}
                source={require("../../assets/logo.jpeg")}
              />
            </View>
            <Text style={styles.headerTitle}>RADAR EARTH</Text>
          </View>
        </View>

        <View
          style={[
            styles.contentContainer,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              padding: 20,
            }}
            keyboardShouldPersistTaps="handled"
          >
            <View style={{ marginVertical: 10 }}>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "bold",
                  marginVertical: 10,
                }}
              >
                {i18n.t("login.title")}
              </Text>
              <Text style={[styles.label, { color: theme.colors.primary }]}>
                {i18n.t("login.emailLabel")}
              </Text>
              <TextInput
                mode="outlined"
                placeholder={i18n.t("login.emailPlaceholder")}
                value={formFields.email}
                onChangeText={handleChange("email")}
              />
              <Text style={[styles.label, { color: theme.colors.primary }]}>
                {i18n.t("login.passwordLabel")}
              </Text>
              <TextInput
                mode="outlined"
                placeholder={i18n.t("login.passwordPlaceholder")}
                style={{ marginBottom: 10 }}
                value={formFields.password}
                onChangeText={handleChange("password")}
                secureTextEntry={!seePassword}
                right={
                  <TextInput.Icon
                    icon={seePassword ? "eye-off" : "eye"}
                    onPress={() => setSeePassword(!seePassword)}
                  />
                }
              />
            </View>

            <Button onPress={handleLogin} mode="contained">
              {i18n.t("login.loginButton")}
            </Button>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 10,
                paddingHorizontal: 10,
              }}
            >
              <Text style={{ fontSize: 14 }}>{i18n.t("login.noAccount")}</Text>
              <Text
                style={{
                  color: theme.dark ? Colors.primaryDark : Colors.primary,
                  fontWeight: "bold",
                  fontSize: 14,
                }}
                onPress={() => {
                  setFormFields({ email: "", password: "", username: "" });
                  setShowRegister(true);
                  setSeePassword(false);
                }}
              >
                {i18n.t("login.registerHere")}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 30,
              }}
            >
              <View style={{ flex: 1, height: 1, backgroundColor: "#ccc" }} />
              <Text style={{ marginHorizontal: 10, color: "#888" }}>O</Text>
              <View style={{ flex: 1, height: 1, backgroundColor: "#ccc" }} />
            </View>

            <Button
              mode="outlined"
              icon={() => <AntDesign name="google" size={24} color="#DB4437" />}
              onPress={handleloginGoogle}
            >
              {i18n.t("login.continueWithGoogle")}
            </Button>
            <View style={{ height: 10 }} />
            <Button
              mode="outlined"
              icon={() => (
                <AntDesign
                  name="apple"
                  size={24}
                  color={theme.dark ? "white" : "#000"}
                />
              )}
              onPress={handleloginGoogle}
            >
              {i18n.t("login.continueWithApple")}
            </Button>
          </ScrollView>
        </View>
      </Modal>
      <Modal
        visible={showRegister}
        onDismiss={hideRegisterModal}
        dismissable={false}
        contentContainerStyle={{
          backgroundColor: theme.colors.background,
          padding: 20,
          borderRadius: 25,
          width: "90%",
          alignSelf: "center",
          marginBottom: keyboardOffset,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <IconButton
            icon="close"
            size={24}
            onPress={hideRegisterModal}
            style={styles.closeButton}
          />
        </View>
        <ScrollView
          contentContainerStyle={{
            paddingVertical: 10,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
            {i18n.t("register.title")}
          </Text>
          <Text style={[styles.label, { color: theme.colors.primary }]}>
            {i18n.t("register.usernameLabel")}
          </Text>
          <TextInput
            mode="outlined"
            placeholder={i18n.t("register.usernamePlaceholder")}
            value={formFields.name}
            onChangeText={handleChange("name")}
          />
          <Text style={[styles.label, { color: theme.colors.primary }]}>
            {i18n.t("register.emailLabel")}
          </Text>
          <TextInput
            mode="outlined"
            placeholder={i18n.t("register.emailPlaceholder")}
            value={formFields.email}
            onChangeText={handleChange("email")}
          />
          <Text style={[styles.label, { color: theme.colors.primary }]}>
            {i18n.t("register.passwordLabel")}
          </Text>
          <TextInput
            mode="outlined"
            placeholder={i18n.t("register.passwordPlaceholder")}
            value={formFields.password}
            onChangeText={handleChange("password")}
            style={{ marginBottom: 20 }}
            secureTextEntry={!seePassword}
            right={
              <TextInput.Icon
                icon={seePassword ? "eye-off" : "eye"}
                onPress={() => setSeePassword(!seePassword)}
              />
            }
          />
          <Button mode="contained" onPress={handleRegister}>
            {i18n.t("register.registerButton")}
          </Button>
        </ScrollView>
      </Modal>
    </Portal>
  );
}
const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: "center",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 10,
  },
  headerContent: {
    alignItems: "center",
  },
  logoContainer: {
    backgroundColor: "white",
    borderRadius: 100,
    width: 120,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 50,
  },
  headerTitle: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    paddingTop: 10,
    paddingBottom: 10,
  },
  contentContainer: {
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: "hidden",
    marginTop: -25, // para que se vea redondeado sobre el header
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    marginTop: 12,
  },
});
