import React from "react";
import { View, StyleSheet } from "react-native";
import { Switch, Text, useTheme } from "react-native-paper";
import { useThemeStore } from "../stores/themeStore";

export default function DrawerThemeSwitch() {
  const theme = useTheme();
  const darkMode = useThemeStore((state) => state.darkMode);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <View style={styles.row}>
      <Text style={{ color: theme.colors.onSurface, fontWeight: "bold", fontSize: 16 }}>
        Modo oscuro
      </Text>
      <Switch value={darkMode} onValueChange={toggleTheme} color={theme.colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
  },
});
