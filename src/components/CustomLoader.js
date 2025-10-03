import { View, Text, StyleSheet } from "react-native";
import { Modal, Portal } from "react-native-paper";
import { Image } from "expo-image";

export default function CustomLoader({ loading, modalStyle, indicatorStyle }) {
  return (
    <Portal>
      <Modal visible={loading}>
        <View style={[styles.modalBackground, modalStyle]}>
          <View style={[styles.activityIndicatorWrapper, indicatorStyle]}>
            <Image
              style={{ width: 100, height: 100, borderRadius: 5 }}
              source={require("../../assets/videoloading.gif")}
            />
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
    backgroundColor: "#00000080",
    zIndex: 1000,
  },
  activityIndicatorWrapper: {
    height: 100,
    width: 100,
    borderRadius: 10,
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
