import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  Modal,
  Portal,
  Button,
  IconButton,
  TextInput,
  Divider,
  Text,
} from "react-native-paper";
import { useTheme } from "react-native-paper";
import { Colors } from "../utils/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Pressable } from "react-native";
import { Image } from "expo-image";

let showLoginFn;

export function showLoginModal() {
  if (showLoginFn) showLoginFn(true);
}

export default function LoginModal() {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const [seePassword, setSeePassword] = useState(false);
  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    showLoginFn = setVisible;
    return () => {
      showLoginFn = null;
    };
  }, []);

  const hideModal = () => setVisible(false);

  const handleChange = (field) => (value) =>
    setFormFields({ ...formFields, [field]: value });

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        dismissable={false}
        contentContainerStyle={{
          flex: 1,
          backgroundColor: theme.colors.background,
        }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
          <View style={styles.header}>
            <IconButton
              icon="chevron-left"
              size={24}
              onPress={hideModal}
              style={styles.closeButton}
            />
          </View>

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
          <Divider />
          <Text>También puede iniciar sesión con:</Text>
          <View style={styles.buttonRow}>
            <Pressable style={styles.socialButton}>
              <AntDesign name="google" size={25} />
            </Pressable>

            <Pressable style={styles.socialButton}>
              <AntDesign name="apple" size={25} />
            </Pressable>
          </View>
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
    justifyContent: "space-between",
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
