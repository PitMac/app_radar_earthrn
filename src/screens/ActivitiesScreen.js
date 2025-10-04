import { View, Text } from "react-native";
import React from "react";
import CustomAppBar from "../components/CustomAppBar";
import { useNavigation } from "@react-navigation/native";
import GlobalIcon from "../components/GlobalIcon";

export default function ActivitiesScreen() {
  const navigation = useNavigation();

  return (
    <View>
      <CustomAppBar
        title="Actividades"
        showDrawerButton
        onDrawerPress={() => navigation.openDrawer()}
      />
      <GlobalIcon name={"menu"} color="white" />
    </View>
  );
}
