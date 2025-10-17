import {
  Modal,
  Portal,
  Button,
  Text,
  IconButton,
  useTheme,
} from "react-native-paper";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Image } from "expo-image";
import { Colors } from "../utils/Colors";
import i18n from "../i18n";

let showModalFn;

export function showModalUpgradePro() {
  if (showModalFn) showModalFn(true);
}

export default function UpgradeProModal() {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("mensual");

  useEffect(() => {
    showModalFn = setVisible;
    return () => {
      showModalFn = null;
    };
  }, []);

  const hideModal = () => setVisible(false);

  const beneficios = [
    { id: 1, text: i18n.t("upgradePro.beneficios.0") },
    { id: 2, text: i18n.t("upgradePro.beneficios.1") },
    { id: 3, text: i18n.t("upgradePro.beneficios.2") },
    { id: 4, text: i18n.t("upgradePro.beneficios.3") },
  ];

  const planes = [
    {
      id: "mensual",
      titulo: i18n.t("upgradePro.planes.mensual.titulo"),
      precio: i18n.t("upgradePro.planes.mensual.precio"),
      duracion: i18n.t("upgradePro.planes.mensual.duracion"),
      color: theme.colors.primary,
    },
    {
      id: "anual",
      titulo: i18n.t("upgradePro.planes.anual.titulo"),
      precio: i18n.t("upgradePro.planes.anual.precio"),
      duracion: i18n.t("upgradePro.planes.anual.duracion"),
      color: Colors.secondary || "#0088cc",
      isPopular: true,
    },
  ];

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        dismissable={false}
        contentContainerStyle={styles.modalContainer}
      >
        <IconButton
          icon="close"
          size={24}
          onPress={hideModal}
          style={styles.closeButton}
          iconColor="white"
        />

        <View
          style={[
            styles.headerContainer,
            { backgroundColor: theme.colors.primary },
          ]}
        >
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
            styles.cardContainer,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <View>
            <Text style={[styles.title, { color: theme.colors.onSurface }]}>
              {i18n.t("upgradePro.title")}
            </Text>
            <Text style={styles.subtitle}>{i18n.t("upgradePro.subtitle")}</Text>

            <View style={styles.beneficiosContainer}>
              {beneficios.map((item) => (
                <View key={item.id} style={styles.itemRow}>
                  <FontAwesome
                    name="check-circle"
                    size={18}
                    color={planes.find((p) => p.id === selectedPlan)?.color}
                  />
                  <Text style={styles.itemText}>{item.text}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.planesContainer}>
            {planes.map((plan) => {
              const isSelected = selectedPlan === plan.id;
              return (
                <TouchableOpacity
                  key={plan.id}
                  style={[
                    styles.planCard,
                    {
                      borderColor: isSelected
                        ? plan.color
                        : theme.colors.backdrop,
                      borderWidth: isSelected ? 3 : 1,
                    },
                  ]}
                  onPress={() => setSelectedPlan(plan.id)}
                  activeOpacity={0.8}
                >
                  {plan.isPopular && (
                    <View
                      style={[
                        styles.popularTag,
                        { backgroundColor: plan.color },
                      ]}
                    >
                      <Text style={styles.popularText}>POPULAR</Text>
                    </View>
                  )}
                  <Text
                    style={[
                      styles.planTitle,
                      { color: theme.colors.onSurface },
                    ]}
                  >
                    {plan.titulo}
                  </Text>
                  <Text style={[styles.planPrice, { color: plan.color }]}>
                    {plan.precio}
                  </Text>
                  <Text style={styles.planDuration}>{plan.duracion}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Button
            mode="contained"
            style={[
              styles.subscribeButton,
              {
                backgroundColor: planes.find((p) => p.id === selectedPlan)
                  ?.color,
              },
            ]}
            labelStyle={{ fontWeight: "bold" }}
            onPress={() => {
              console.log(`Plan seleccionado: ${selectedPlan}`);
              hideModal();
            }}
          >
            {i18n.t("upgradePro.subscribeButton")}
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    overflow: "hidden",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
  },
  headerContainer: {
    paddingVertical: 30,
    paddingHorizontal: 20,
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
  cardContainer: {
    flex: 1,
    marginTop: -30,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    paddingVertical: 30,
    justifyContent: "space-around",
  },
  title: {
    fontSize: 24,
    fontWeight: "900",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "gray",
    marginTop: 5,
    textAlign: "center",
    marginBottom: 15,
  },
  beneficiosContainer: {
    marginVertical: 10,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  itemText: {
    marginLeft: 12,
    fontSize: 15,
  },
  planesContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
    gap: 10,
    flexGrow: 1,
    marginVertical: 60,
  },
  planCard: {
    flex: 1,
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    position: "relative",
    justifyContent: "space-between",
  },
  popularTag: {
    position: "absolute",
    top: -12,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  popularText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  planTitle: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 5,
    marginTop: 10,
    textAlign: "center",
  },
  planPrice: {
    fontSize: 28,
    fontWeight: "900",
  },
  planDuration: {
    fontSize: 14,
    color: "gray",
    marginBottom: 5,
  },
});
