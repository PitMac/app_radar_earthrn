import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text, useTheme, Modal, Portal } from "react-native-paper";
import i18n from "../i18n";
import { Colors } from "../utils/Colors";

export default function HelpModal({ visible, onClose }) {
  const theme = useTheme();

  const colorInfo = [
    {
      color: "#4CAF50",
      label: i18n.t("helpModal.colors.green.label"),
      desc: i18n.t("helpModal.colors.green.desc"),
    },
    {
      color: "#FFC107",
      label: i18n.t("helpModal.colors.yellow.label"),
      desc: i18n.t("helpModal.colors.yellow.desc"),
    },
    {
      color: "#F44336",
      label: i18n.t("helpModal.colors.red.label"),
      desc: i18n.t("helpModal.colors.red.desc"),
    },
    {
      color: "#9C27B0",
      label: i18n.t("helpModal.colors.purple.label"),
      desc: i18n.t("helpModal.colors.purple.desc"),
    },
  ];
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={[
          helpStyles.modalContent,
          { backgroundColor: theme.colors.surface },
        ]}
      >
        <Text style={[helpStyles.modalTitle, { color: theme.colors.text }]}>
          {i18n.t("helpModal.title")}
        </Text>
        {colorInfo.map((item) => (
          <View key={item.label} style={helpStyles.colorRow}>
            <View
              style={[helpStyles.colorCircle, { backgroundColor: item.color }]}
            />
            <View style={{ flex: 1 }}>
              <Text
                style={[helpStyles.colorLabel, { color: theme.colors.text }]}
              >
                {item.label}
              </Text>
              <Text
                style={[helpStyles.colorDesc, { color: theme.colors.text }]}
              >
                {item.desc}
              </Text>
            </View>
          </View>
        ))}
        <TouchableOpacity style={helpStyles.closeButton} onPress={onClose}>
          <Text style={helpStyles.closeButtonText}>
            {i18n.t("helpModal.closeButton")}
          </Text>
        </TouchableOpacity>
      </Modal>
    </Portal>
  );
}

const helpStyles = StyleSheet.create({
  modalContent: {
    width: "88%",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 24,
    elevation: 8,
    alignItems: "center",
    alignSelf: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 18,
    color: "#222",
  },
  colorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    width: "100%",
  },
  colorCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 16,
    borderWidth: 2,
    borderColor: "#eee",
  },
  colorLabel: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#222",
  },
  colorDesc: {
    fontSize: 14,
    color: "#555",
  },
  closeButton: {
    marginTop: 24,
    backgroundColor: Colors.primary,
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 25,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
