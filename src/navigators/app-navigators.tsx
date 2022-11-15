import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./navigator-types";
import {
  BottomSheetScreen,
  DragDropScreen,
  MainScreen,
  TwitterProfileScreen,
} from "../screens";

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export const AppNavigators = () => {
  return (
    <Navigator
      screenOptions={{
        headerBackTitle: "",
      }}
    >
      <Screen
        name={"Main"}
        component={MainScreen}
        options={{ headerShown: false }}
      />
      <Screen
        name={"TwitterProfile"}
        component={TwitterProfileScreen}
        options={{
          title: "",
          headerTintColor: "#fff",
          headerTransparent: true,
        }}
      />
      <Screen
        name={"BottomSheet"}
        component={BottomSheetScreen}
        options={{
          title: "Bottom Sheet",
        }}
      />
      <Screen
        name={"DragDrop"}
        component={DragDropScreen}
        options={{
          title: "Drag Drop",
        }}
      />
    </Navigator>
  );
};
