import React from "react";
import { Text, View } from "react-native";
import { RootStackScreenProps } from "../navigators";

export const MainScreen = ({
  navigation: { navigate },
}: RootStackScreenProps<"TwitterProfile">) => {
  return (
    <View>
      <Text>MainScreen</Text>
      <Text onPress={() => navigate("TwitterProfile")}>Twitter Profile</Text>
    </View>
  );
};
