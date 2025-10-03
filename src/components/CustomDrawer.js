import { View, Text } from "react-native";
import React, { useState } from "react";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Drawer, useTheme } from "react-native-paper";
import { showLoginModal } from "./LoginModal";

export default function CustomDrawer(props) {
  const theme = useTheme();
  const [active, setActive] = useState(0);
  let [visible, setVisible] = useState(true);
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <Drawer.Section>
        <Drawer.Item
          label="Inicio"
          active={active === 0}
          onPress={() => {
            setActive(0);
            props.navigation.navigate("Inicio");
          }}
        />
        <Drawer.Item
          label="Perfil"
          active={active === 1}
          onPress={() => {
            if (visible) {
              props.navigation.goBack();
              showLoginModal();
              //showModalUpgradePro();
            } else {
              setActive(1);
              props.navigation.navigate("Perfil");
            }
          }}
        />
      </Drawer.Section>
    </DrawerContentScrollView>
  );
}
