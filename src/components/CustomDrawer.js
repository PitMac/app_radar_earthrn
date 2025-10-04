import { View,StyleSheet } from "react-native";
import React, { useState } from "react";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import {Divider, Drawer, useTheme,Text} from "react-native-paper";
import { showLoginModal } from "./LoginModal";
import Feather from '@expo/vector-icons/Feather';
import {Image} from "expo-image";
import {showModalUpgradePro} from "./UpgradeProModal";
import GlobalIcon from "./GlobalIcon";

export default function CustomDrawer(props) {
  const theme = useTheme();
  const [active, setActive] = useState(0);
  let [visible, setVisible] = useState(true);
  const appVersion = "free";

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: theme.colors.surface,
        paddingStart: 0,
        paddingEnd: 0,
      }}
    >
        <View style={{ padding: 0, margin: 0, width: "100%" }}>
            <View style={styles.header}>
                <View style={styles.ribbonContainer}>
                    <View
                        style={[
                            styles.ribbon,
                            {
                                backgroundColor:
                                    appVersion === "pro" ? "#ff0000" : "#4caf50",
                            },
                        ]}
                    >
                        <Text style={styles.ribbonText}>
                            {appVersion.toUpperCase()}
                        </Text>
                    </View>
                </View>
                <View style={{ flexDirection: "row",alignItems: "center" }}>
                    <View
                        style={{
                            backgroundColor: "white",
                            borderRadius: 50,
                            width:85,
                            height:85,
                            alignItems:'center',
                            justifyContent:'center',
                        }}
                    >
                        <Image
                            style={{ width: 100, height: 100 }}
                            source={require("../../assets/logo.jpeg")}
                        />
                    </View>
                    <Text  variant="headlineLarge" style={{color:'white',marginLeft:20,fontWeight:'bold'}}>RADAR EARTH</Text>
                </View>
            </View>
            <Drawer.Section showDivider={false}>
                <Drawer.Item
                    label="Inicio"
                    active={active === 0}
                    icon={()=><Feather name="home" size={24} color={theme.colors.onSurface} />}
                    right={()=><Feather name="chevron-right" size={24} color={theme.colors.onSecondaryContainer} />}
                    onPress={() => {
                        setActive(0);
                        props.navigation.navigate("Inicio");
                    }}
                />
                <Drawer.Item
                    label="Perfil"
                    active={active === 1}
                    icon={()=><Feather name="user" size={24} color={active === 1 ? theme.colors.onSecondaryContainer : theme.colors.onSurface} />}
                    right={()=><Feather name="chevron-right" size={24} color={theme.colors.onSecondaryContainer} />}
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
        </View>
        <View>
            <Divider />
            <Drawer.Item
                label="Configuracion"
                active={active === 2}
                icon={()=><Feather name="settings" size={24} color={theme.colors.onSurface} />}
                right={()=><Feather name="chevron-right" size={24} color={active === 2 ? theme.colors.onSecondaryContainer : theme.colors.onSurface} />}
                onPress={() => {
                    if (visible) {
                        props.navigation.goBack();
                        //showLoginModal();
                        showModalUpgradePro();
                    } else {
                        setActive(2);
                        props.navigation.navigate("Perfil");
                    }
                }}
            />
            {appVersion === "free" &&
                <Drawer.Item
                    label="MEJORAR A PRO"
                    icon={()=><GlobalIcon family="materialC" name={"license"} size={30} color={'#FF9B00'} />}
                    onPress={() => {
                        props.navigation.goBack();
                        showModalUpgradePro();
                    }}
                />
            }
        </View>
    </DrawerContentScrollView>
  );
}


const styles = StyleSheet.create({
    header: {
        backgroundColor: "#024280",
        marginTop: -4,
        marginBottom: 15,
        height: 130,
        alignItems: "flex-start",
        justifyContent: "center",
        paddingHorizontal: 10,
        padding: 0,
        overflow: "hidden",
    },
    ribbonContainer: {
        position: "absolute",
        top: 10,
        right: -20,
        transform: [{ rotate: "45deg" }],
        zIndex: 10,
    },
    ribbon: {
        paddingVertical: 3,
        paddingHorizontal: 25,
        backgroundColor: "#ff4081",
        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    ribbonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 15,
        textAlign: "center",
    },
});
