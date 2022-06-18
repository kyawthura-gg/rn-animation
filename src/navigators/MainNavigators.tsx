import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./navigatorTypes";
import { MainScreen, TwitterProfileScreen } from "../screens";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={"Main"} component={MainScreen} />
      <Stack.Screen name={"TwitterProfile"} component={TwitterProfileScreen} />
    </Stack.Navigator>
  );
};
