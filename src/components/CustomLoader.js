import { View, Text, StyleSheet } from "react-native";
import { Modal, Portal, useTheme } from "react-native-paper";
import { Image } from "expo-image";
import {
  PulseIndicator,
  SkypeIndicator,
  WaveIndicator,
} from "react-native-indicators";

export default function CustomLoader({ loading, modalStyle, indicatorStyle }) {
  const theme = useTheme();
  return (
    <Portal>
      <Modal visible={loading}>
        <View style={[styles.modalBackground, modalStyle]}>
          <View
            style={[
              styles.activityIndicatorWrapper,
              indicatorStyle,
            ]}
          >
            <WaveIndicator color={theme.colors.primary} size={90} />
          </View>
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "red",
    zIndex: 1000,
  },
  activityIndicatorWrapper: {
    height: 100,
    width: 100,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
