import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SCREEN_LISTS } from "../constants/screen-routes";
import { RootStackScreenProps } from "../navigators";

export const MainScreen = ({
  navigation: { navigate },
}: RootStackScreenProps<"TwitterProfile">) => {
  return (
    <SafeAreaView className="mx-5 py-4">
      {SCREEN_LISTS.map((screen) => (
        <TouchableOpacity
          key={screen.name}
          onPress={() => navigate(screen.name)}
          className="px-6 py-3 bg-gray-600 rounded-md mb-4"
          activeOpacity={0.8}
        >
          <Text className="text-white font-extrabold text-lg">
            {screen.label}
          </Text>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
};
