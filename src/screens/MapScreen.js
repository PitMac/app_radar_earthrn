import { View, Text, StyleSheet } from "react-native";
import WebView from "react-native-webview";
import CustomAppBar from "../components/CustomAppBar";
import { useNavigation } from "@react-navigation/native";

export default function MapScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <CustomAppBar
        title="RADAR EARTH"
        showDrawerButton
        onDrawerPress={() => navigation.openDrawer()}
      />
      <WebView source={{ uri: "https://radareart.pages.dev/" }} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
