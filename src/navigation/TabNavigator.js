import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ActivitiesScreen from "../screens/ActivitiesScreen";
import MapScreen from "../screens/MapScreen";
import BlogScreen from "../screens/BlogScreen";
import { BottomNavigation } from "react-native-paper";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
/*
const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Actividades" component={ActivitiesScreen} />
      <Tab.Screen name="Mapa" component={MapScreen} />
      <Tab.Screen name="Blog" component={BlogScreen} />
    </Tab.Navigator>
  );
}
*/

export default function HomeTabs({ navigation }) {
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: "activities", title: "Actividades", icon: "home" },
    { key: "map", title: "Mapa", icon: "map" },
    { key: "blog", title: "Blog", icon: "rss" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    activities: ActivitiesScreen,
    map: MapScreen,
    blog: BlogScreen,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      shifting={true}
      sceneAnimationEnabled={true}
      renderIcon={({ route, focused, color }) => (
        <MaterialDesignIcons name={route.icon} size={24} color={color} />
      )}
    />
  );
}
