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
import * as Google from "expo-auth-session/providers/google";
import { useTheme } from "react-native-paper";
import { Colors } from "../utils/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Image } from "expo-image";
import instance from "../utils/Instance";
import * as AuthSession from "expo-auth-session";
import { useUserStore } from "../stores/userStore";
import { showAlert } from "./CustomAlert";
import CustomLoader from "./CustomLoader";
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
    androidClientId:
      "741989100077-skikooq060p69qmctgrug3d0csdo7nq8.apps.googleusercontent.com",
    iosClientId: "",
    redirectUri: AuthSession.makeRedirectUri({ scheme: "app_radarrearthrn" }),
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
      console.log(result);

      if (result?.type === "success" && result.authentication?.idToken) {
        const idToken = result.authentication.idToken;
        const apiResponse = await instance.post("api/login-google", {
          token: idToken,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async () => {
    const { email, password } = formFields;
    if (!email.trim() || !password.trim()) {
      showAlert({
        title: "Error",
        message: "Por favor, completa todos los campos.",
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
        title: "Error",
        message: "Error al iniciar sesión, revisa tus datos.",
      });
    }
  };

  const handleRegister = async () => {
    const { username, email, password } = formFields;

    if (!username.trim() || !email.trim() || !password.trim()) {
      showAlert({
        title: "Error",
        message: "Por favor, completa todos los campos.",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showAlert({
        title: "Error",
        message: "Por favor, ingresa un correo válido.",
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
        title: "Éxito",
        message: "Registro exitoso, ya puedes iniciar sesión.",
      });
    } catch (error) {
      console.error(
        "Error al registrar:",
        error?.response?.data || error.message
      );
      showAlert({
        title: "Error",
        message:
          error?.response?.data?.message ||
          "Ocurrió un error al registrar. Intenta nuevamente.",
      });
    }
  };

  return (
    <Portal>
      <CustomLoader loading={loading} />
      <Modal
        visible={visible}
        onDismiss={hideModal}
        dismissable={false}
        contentContainerStyle={{
          flex: 1,
          backgroundColor: theme.colors.background,
          marginBottom: keyboardOffset,
        }}
      >
        <View style={styles.header}>
          <IconButton
            icon="chevron-left"
            size={24}
            onPress={hideModal}
            style={styles.closeButton}
          />
        </View>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            padding: 20,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              style={{ width: 170, height: 170, borderRadius: 5 }}
              source={require("../../assets/logo.jpeg")}
            />
          </View>

          <View style={{ marginVertical: 10 }}>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", marginVertical: 10 }}
            >
              Iniciar sesión
            </Text>
            <TextInput
              mode="outlined"
              label="Email"
              style={{ marginBottom: 5 }}
              value={formFields.email}
              onChangeText={handleChange("email")}
            />
            <TextInput
              mode="outlined"
              label="Contraseña"
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
            INICIAR SESION
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
            <Text style={{ fontSize: 14 }}>¿No tienes cuenta?</Text>
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
              Regístrate aquí
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 20,
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
            Continuar con Google
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
            Continuar con Apple
          </Button>
        </ScrollView>
      </Modal>
      <Modal
        visible={showRegister}
        onDismiss={hideRegisterModal}
        dismissable={false}
        contentContainerStyle={{
          backgroundColor: theme.colors.background,
          padding: 20,
          borderRadius: 12,
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
            Registrarse
          </Text>
          <TextInput
            mode="outlined"
            label="Nombre completo"
            value={formFields.name}
            onChangeText={handleChange("name")}
          />
          <TextInput
            mode="outlined"
            label="Email"
            value={formFields.email}
            onChangeText={handleChange("email")}
          />
          <TextInput
            mode="outlined"
            label="Contraseña"
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
            REGISTRARSE
          </Button>
        </ScrollView>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    borderRadius: 8,
    padding: 20,
  },
  header: {
    marginTop: 15,
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  title: { fontSize: 20, fontWeight: "bold" },
  closeButton: { margin: 0 },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  socialButton: {
    width: 70,
    height: 70,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.primary,
  },
});
