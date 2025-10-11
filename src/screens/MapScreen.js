import { View, Text, StyleSheet } from "react-native";
import WebView from "react-native-webview";
import CustomAppBar from "../components/CustomAppBar";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useThemeStore } from "../stores/themeStore";
import { useCallback, useState } from "react";
import CustomLoader from "../components/CustomLoader";

export default function MapScreen() {
  const navigation = useNavigation();
  const { darkMode, theme, toggleTheme } = useThemeStore();
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setIsFocused(true);
      return () => {
        setIsFocused(false);
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <CustomLoader loading={loading} />
      <CustomAppBar
        title="RADAR EARTH"
        showDrawerButton
        onDrawerPress={() => navigation.openDrawer()}
      />
      {isFocused && (
        <WebView
          source={{ uri: "https://danger27.pages.dev/" }}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          injectedJavaScriptBeforeContentLoaded={`
      document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
          document.body.style.display = 'none';
        } else {
          document.body.style.display = 'block';
        }
      });
      true;
    `}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
