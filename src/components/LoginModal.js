import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import {
  Modal,
  Portal,
  Button,
  IconButton,
  TextInput,
  Divider,
  Text,
} from "react-native-paper";
import * as Google from "expo-auth-session/providers/google";
import { useTheme } from "react-native-paper";
import { Colors } from "../utils/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Pressable } from "react-native";
import { Image } from "expo-image";
import instance from "../utils/Instance";

let showLoginFn;

export function showLoginModal() {
  if (showLoginFn) showLoginFn(true);
}

export default function LoginModal() {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [seePassword, setSeePassword] = useState(false);
  const [formFields, setFormFields] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "560383714945-si48vv1mv22i5hg3v4oae5g9ce6hllg3.apps.googleusercontent.com",
    iosClientId: "",
  });

  const [keyboardOffset, setKeyboardOffset] = useState(0);

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", (e) => {
      setKeyboardOffset(e.endCoordinates.height);
    });
    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardOffset(0);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  useEffect(() => {
    showLoginFn = setVisible;
    return () => {
      showLoginFn = null;
    };
  }, []);

  const hideModal = () => {
    setVisible(false);
    setFormFields({ email: "", password: "", name: "" });
  };

  const hideRegisterModal = () => {
    setShowRegister(false);
    setFormFields({ email: "", password: "", name: "" });
  };

  const handleChange = (field) => (value) =>
    setFormFields({ ...formFields, [field]: value });

  const handleloginGoogle = async () => {
    try {
      const result = await promptAsync();
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

  const handleLogin = () => {
    console.log("Registrando:", formFields);
    hideRegisterModal();
  };

  const handleRegister = () => {
    console.log("Registrando:", formFields);
    hideRegisterModal();
  };

  return (
    <Portal>
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
              value={formFields.email}
              onChangeText={handleChange("email")}
            />
            <TextInput
              mode="outlined"
              secureTextEntry={!seePassword}
              label="Contraseña"
              value={formFields.password}
              onChangeText={handleChange("password")}
              right={
                <TextInput.Icon
                  icon={seePassword ? "eye-off" : "eye"}
                  onPress={() => setSeePassword(!seePassword)}
                />
              }
            />
          </View>
          <Button mode="contained">INICIAR SESION</Button>
          <Text
            style={{ textAlign: "center", marginTop: 10, marginBottom: 10 }}
          >
            ¿No tienes cuenta?{" "}
            <Text
              style={{ color: Colors.primary, fontWeight: "bold" }}
              onPress={() => setShowRegister(true)}
            >
              Regístrate
            </Text>
          </Text>
          <Divider />
          <Text
            style={{ textAlign: "center", marginTop: 10, marginBottom: 10 }}
          >
            También puede iniciar sesión con:
          </Text>
          <View style={styles.buttonRow}>
            <Pressable onPress={handleloginGoogle} style={styles.socialButton}>
              <AntDesign name="google" size={25} />
            </Pressable>

            <Pressable style={styles.socialButton}>
              <AntDesign name="apple" size={25} />
            </Pressable>
          </View>
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
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
            Registrarse
          </Text>
          <TextInput
            mode="outlined"
            label="Nombre completo"
            value={formFields.name}
            onChangeText={handleChange("name")}
            style={{ marginBottom: 10 }}
          />
          <TextInput
            mode="outlined"
            label="Email"
            value={formFields.email}
            onChangeText={handleChange("email")}
            style={{ marginBottom: 10 }}
          />
          <TextInput
            mode="outlined"
            secureTextEntry
            label="Contraseña"
            value={formFields.password}
            onChangeText={handleChange("password")}
            style={{ marginBottom: 20 }}
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
