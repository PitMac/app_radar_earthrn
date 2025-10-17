import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import {
  Text,
  TextInput,
  Button,
  Switch,
  Appbar,
  Divider,
  useTheme,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import GlobalIcon from "../components/GlobalIcon";
import { Colors } from "../utils/Colors";
import CustomPicker from "../components/CustomPicker";
import CustomAppBar from "../components/CustomAppBar";

const REGIONS = [
  { label: "Latinoamérica", value: "Latinoamérica" },
  { label: "Norteamérica", value: "Norteamérica" },
  { label: "Europa", value: "Europa" },
  { label: "Asia", value: "Asia" },
  { label: "Oceanía", value: "Oceanía" },
  { label: "África", value: "África" },
];

export default function ProfileScreen() {
  const theme = useTheme();
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [region, setRegion] = useState("");
  const [internationalAlerts, setInternationalAlerts] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <CustomAppBar
        title=""
        onBackPress={() => navigation.goBack()}
        style={{ backgroundColor: theme.colors.primary }}
        showDrawerButton
        onDrawerPress={() => navigation.openDrawer()}
      />
      <View
        pointerEvents="box-none"
        style={{
          alignItems: "center",
          marginTop: -60,
          zIndex: 1,
        }}
      >
        <TouchableOpacity activeOpacity={0.8}>
          {/* Contenedor que hace de borde */}
          <View
            style={{
              padding: 7, // grosor del borde
              borderRadius: 55, // debe ser un poco mayor al del avatar
              backgroundColor: theme.colors.primary,
            }}
          >
            <Image
              source={require("../../assets/icon.png")}
              style={styles.avatar}
            />
          </View>

          {/* Botón de editar */}
          <View
            style={[
              styles.avatarEditCircle,
              {
                backgroundColor: theme.colors.primary,
                borderColor: "#fff",
              },
            ]}
          >
            <GlobalIcon
              family="materialC"
              name="pencil"
              size={20}
              color="#fff"
            />
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Portada azul */}

        {/* Card de datos */}
        <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.label, { color: theme.colors.primary }]}>
            Nombre de usuario
          </Text>
          <TextInput
            mode="outlined"
            value={username}
            onChangeText={setUsername}
            placeholder="Tu nombre"
            style={[styles.input, { backgroundColor: undefined }]}
          />
          <Text style={[styles.label, { color: theme.colors.primary }]}>
            Correo electrónico
          </Text>
          <TextInput
            mode="outlined"
            value={email}
            onChangeText={setEmail}
            placeholder="correo@ejemplo.com"
            style={[styles.input, { backgroundColor: undefined }]}
            keyboardType="email-address"
          />
          <Button
            mode="contained-tonal"
            style={[styles.button]}
            onPress={() => {}}
            icon="lock-reset"
          >
            Cambiar contraseña
          </Button>
          <Divider style={{ marginVertical: 16 }} />
          <Text style={[styles.label, { color: theme.colors.primary }]}>
            Región
          </Text>
          <CustomPicker
            items={REGIONS}
            text={
              region
                ? REGIONS.find((p) => p.value === region)?.label
                : "SELECCIONE UNA REGION"
            }
            onValueChange={setRegion}
            dropdownIconColor={theme.colors.primary}
          />

          <Divider style={{ marginVertical: 16 }} />
          <View style={styles.switchRow}>
            <Text style={[styles.label, { color: theme.colors.onSurface }]}>
              Alertas internacionales
            </Text>
            <Switch
              value={internationalAlerts}
              onValueChange={setInternationalAlerts}
              color={theme.colors.primary}
            />
          </View>
          <View style={styles.switchRow}>
            <Text style={[styles.label, { color: theme.colors.onSurface }]}>
              Push notifications
            </Text>
            <Switch
              value={pushNotifications}
              onValueChange={setPushNotifications}
              color={theme.colors.primary}
            />
          </View>
          <Divider style={{ marginVertical: 16 }} />
          <Button
            mode="contained"
            style={styles.saveButton}
            onPress={() => {}}
            icon="content-save"
          >
            Guardar cambios
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    alignItems: "center",
    paddingBottom: 40,
  },
  cover: {
    width: "100%",
    height: 140,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 0,
  },
  menuButton: {
    position: "absolute",
    left: 18,
    zIndex: 10,
    borderRadius: 20,
    padding: 4,
    top: StatusBar.currentHeight + 30,
    transform: [{ translateY: -20 }],
  },
  avatarContainer: {
    position: "absolute",
    top: 70,
    left: 0,
    right: 0,
    alignItems: "center",
    backgroundColor: "white",
    zIndex: 2,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#fff",
    backgroundColor: "#eee",
  },
  avatarEditCircle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  card: {
    marginTop: 20,
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 24,
    alignItems: "stretch",
    borderTopRightRadius: 25,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    marginTop: 12,
  },
  input: {
    marginBottom: 8,
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 25,
    backgroundColor: Colors.secondary,
  },
  select: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 8,
  },
  selectText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  regionList: {
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
    marginTop: -8,
    zIndex: 10,
  },
  regionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  saveButton: {
    marginTop: 10,
    backgroundColor: Colors.primary,
    paddingVertical: 5,
    borderRadius: 25,
  },
});
