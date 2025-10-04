import { View, Text, StyleSheet } from "react-native";
import WebView from "react-native-webview";
import CustomAppBar from "../components/CustomAppBar";
import { useNavigation } from "@react-navigation/native";
import { useThemeStore } from "../stores/themeStore";
import { useState } from "react";
import CustomLoader from "../components/CustomLoader";

export default function MapScreen() {
  const navigation = useNavigation();
  const { darkMode, theme, toggleTheme } = useThemeStore();
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.container}>
      <CustomLoader loading={loading} />
      <CustomAppBar
        title="RADAR EARTH"
        showDrawerButton
        onDrawerPress={() => navigation.openDrawer()}
        actions={[
          {
            icon: darkMode ? "weather-sunny" : "weather-night",
            onPress: () => toggleTheme(),
          },
        ]}
      />
      <WebView
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        source={{ uri: "https://danger27.pages.dev/" }}
        //source={{ uri: "https://radareart.pages.dev/" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
