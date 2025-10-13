import { View, Text } from "react-native";
import React from "react";
import { Appbar, useTheme } from "react-native-paper";
import { Colors } from "../utils/Colors";

export default function CustomAppBar({
  title,
  showDrawerButton = false,
  showBackButton = false,
  onDrawerPress,
  onBackPress,
  actions = [],
  style,
  rightComponent,
}) {
  const theme = useTheme();
  const isDark = theme.dark;

  const backgroundColor = isDark ? theme.colors.surface : theme.colors.primary;
  const contentColor = isDark ? theme.colors.onSurface : "#ffffff";
  return (
    <Appbar.Header style={[{ backgroundColor }, style]} mode="center-aligned">
      {showBackButton && (
        <Appbar.BackAction onPress={onBackPress} color={contentColor} />
      )}
      {showDrawerButton && (
        <Appbar.Action
          icon="menu"
          onPress={onDrawerPress}
          color={contentColor}
        />
      )}
      <Appbar.Content title={title} titleStyle={{ color: contentColor }} />
      {actions.map((action, index) => (
        <Appbar.Action
          key={index}
          icon={action.icon}
          onPress={action.onPress}
          color={contentColor}
        />
      ))}
      {rightComponent && rightComponent}
    </Appbar.Header>
  );
}
