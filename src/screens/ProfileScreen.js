import { View, Text } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import CustomAppBar from "../components/CustomAppBar";

export default function ProfileScreen() {
  const navigation = useNavigation();
  return (
    <View>
      <CustomAppBar
        title="Perfil"
        showDrawerButton
        onDrawerPress={() => navigation.openDrawer()}
      />
      <Text>ProfileScreen</Text>
    </View>
  );
}
