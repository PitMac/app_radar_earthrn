import { View, Text } from "react-native";
import React from "react";
import { Appbar } from "react-native-paper";

export default function CustomAppBar({
  title,
  showDrawerButton = false,
  showBackButton = false,
  onDrawerPress,
  onBackPress,
  actions = [],
  style,
}) {
  return (
    <Appbar.Header mode="center-aligned" style={style}>
      {showBackButton && <Appbar.BackAction onPress={onBackPress} />}
      {showDrawerButton && (
        <Appbar.Action icon="menu" onPress={onDrawerPress} />
      )}
      <Appbar.Content title={title} />
      {actions.map((action, index) => (
        <Appbar.Action
          key={index}
          icon={action.icon}
          onPress={action.onPress}
        />
      ))}
    </Appbar.Header>
  );
}
