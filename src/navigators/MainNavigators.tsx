import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./navigatorTypes";
import { MainScreen, TwitterProfileScreen } from "../screens";

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export const MainNavigator = () => {
  return (
    <Navigator>
      <Screen name={"Main"} component={MainScreen} />
      <Screen
        options={{
          headerTransparent: true,
          title: "",
          headerBackTitle: "",
          headerTintColor: "#fff",
        }}
        name={"TwitterProfile"}
        component={TwitterProfileScreen}
      />
    </Navigator>
  );
};
