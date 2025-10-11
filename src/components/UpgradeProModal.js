import {
  Modal,
  Portal,
  Button,
  Text,
  IconButton,
  useTheme,
} from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Image } from "expo-image";
import { Colors } from "../utils/Colors";
import { BlurView } from "expo-blur";

let showModalFn;

export function showModalUpgradePro() {
  if (showModalFn) showModalFn(true);
}

export default function UpgradeProModal() {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    showModalFn = setVisible;
    return () => {
      showModalFn = null;
    };
  }, []);

  const hideModal = () => setVisible(false);

  const beneficios = [
    { id: 1, text: "Sin anuncios" },
    { id: 2, text: "Blog habilitado y estadísticas avanzadas" },
    { id: 3, text: "Notificaciones internacionales" },
  ];

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        dismissable={false}
        contentContainerStyle={{
          overflow: "hidden",
          backgroundColor: theme.colors.surface,
          margin: 20,
          borderRadius: 8,
          borderColor: "grey",
          borderWidth: 1,
          padding: 15,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Image
            style={{ width: 50, height: 50, borderRadius: 5 }}
            source={require("../../assets/logo.jpeg")}
          />
          <Text style={[styles.title, { color: theme.colors.primary }]}>
            ¡MEJORA A PRO!
          </Text>
          <IconButton
            icon="close"
            size={24}
            onPress={hideModal}
            style={styles.closeButton}
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          {beneficios.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <FontAwesome
                name="check-square"
                size={24}
                color={theme.colors.primary}
              />
              <Text style={styles.itemText}>{item.text}</Text>
            </View>
          ))}
        </View>
        <Button
          mode="contained"
          style={{ backgroundColor: theme.colors.primary }}
          onPress={() => {
            hideModal();
          }}
        >
          Mensual USD 0.99
        </Button>
        <View style={{ marginVertical: 5 }} />
        <Button
          mode="contained"
          style={{ backgroundColor: Colors.secondary }}
          onPress={() => {
            console.log("Suscripción anual");
            hideModal();
          }}
        >
          Anual USD 3.99
        </Button>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  itemText: {
    marginLeft: 10,
    fontSize: 16,
  },
});
