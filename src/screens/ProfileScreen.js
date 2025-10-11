import {
  View,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import CustomAppBar from "../components/CustomAppBar";
import {
  Avatar,
  Button,
  FAB,
  IconButton,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import {} from "expo-image";
import { BlurView } from "expo-blur";
import GlobalIcon from "../components/GlobalIcon";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const theme = useTheme();

  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    image: null,
    username: "Usuario123",
    email: "usuario@ejemplo.com",
  });

  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!editMode) {
      setEditMode(true);
    } else {
      setEditMode(false);
    }
    console.log("Guardar cambios:", profile);
  };

  const handleUploadImage = () => {
    console.log("Abrir selector de imagen...");
  };

  return (
    <View style={{ flex: 1 }}>
      {/*  <CustomAppBar
        title="Perfil"
        showDrawerButton
        onDrawerPress={() => navigation.openDrawer()}
      /> */}

      <View style={styles.headerContainer}>
        <ImageBackground
          source={
            profile.image
              ? { uri: profile.image }
              : require("../../assets/icon.png")
          }
          style={styles.headerImage}
          blurRadius={profile.image ? 0 : 5}
        >
          <BlurView
            intensity={50}
            tint={theme.dark ? "dark" : "light"}
          ></BlurView>
          <IconButton
            icon="menu"
            style={styles.backButton}
            mode="contained-tonal"
            iconColor={theme.colors.onPrimary}
            containerColor={theme.colors.primary}
            size={25}
            onPress={() => navigation.openDrawer()}
          />
          {!profile.image && (
            <Button
              icon="camera"
              style={styles.uploadButton}
              mode="text"
              onPress={() => console.log("Pressed")}
            >
              Subir imagen
            </Button>
          )}
          {/*   <GlobalIcon
              family="ion"
              name={Platform.OS === "ios" ? "chevron-back" : "arrow-back"}
              color="#fff"
              size={26}
            /> */}
        </ImageBackground>
      </View>
      <ScrollView
        style={styles.contentContainer}
        contentContainerStyle={{ paddingBottom: 100, flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <TextInput
          label="Nombre de usuario"
          mode="outlined"
          value={profile.username}
          onChangeText={(value) => handleChange("username", value)}
          left={<TextInput.Icon icon="account" />}
          style={styles.input}
        />

        <TextInput
          label="Correo electrónico"
          mode="outlined"
          value={profile.email}
          onChangeText={(value) => handleChange("email", value)}
          left={<TextInput.Icon icon="email" />}
          style={styles.input}
          keyboardType="email-address"
        />
      </ScrollView>

      <FAB
        icon={editMode ? "content-save" : "square-edit-outline"}
        label={editMode ? "Guardar" : "Editar"}
        color={theme.colors.onPrimary}
        mode="flat"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={handleSave}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 250,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
  },
  headerImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  blurOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 15,
    padding: 2,
    zIndex: 10,
  },
  avatarContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  uploadButton: {
    position: "absolute",
    bottom: 5,
    right: 5,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  input: {
    marginVertical: 10,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
  },
});
