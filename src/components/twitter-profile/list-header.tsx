import React, { memo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { TAB_NAMES } from "../../constants/twitter-profile";

const ListHeader = ({
  translateY,
}: {
  translateY: Readonly<Animated.SharedValue<number>>;
}) => {
  const imageScaleStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(translateY.value, [0, 60], [1, 0]),
      },
    ],
  }));

  return (
    <>
      <View className="flex-row justify-between items-end">
        <Animated.Image
          source={{
            uri: "https://pbs.twimg.com/profile_images/1529956155937759233/Nyn1HZWF_400x400.jpg",
          }}
          style={imageScaleStyle}
          className="w-16 h-16 rounded-full border-[3px]"
        />
        <TouchableOpacity className="border-[1px] px-3 py-[6px] rounded-xl border-white">
          <Text className="font-bold text-xs text-white">Edit profile</Text>
        </TouchableOpacity>
      </View>
      <Text className="text-white font-extrabold text-2xl">Elon Musk</Text>
      <Text className="text-gray-400">@elonmusk</Text>
      <Text className="text-white mt-4">Mars & Cars, Chips & Dips</Text>
      <View className="flex-row items-center mt-2">
        <Ionicons name="calendar-outline" color={"#fff"} />
        <Text className="text-gray-400 ml-1 text-xs">Joined June 2009</Text>
      </View>
      <View className="flex-row mt-3">
        <Text className="font-bold text-white">115</Text>
        <Text className="text-white ml-1">Following</Text>
        <Text className="font-bold text-white ml-3">101.3M</Text>
        <Text className="text-white ml-1">Followers</Text>
      </View>
      <View className="flex-row mt-8 top-0 z-40">
        {TAB_NAMES.map((tabName, index) => (
          <TouchableOpacity key={index} className="mr-4">
            <Text className="text-white font-bold">{tabName}</Text>
            {index === 0 ? (
              <View className="h-1 bg-blue-400 rounded-lg mt-2 " />
            ) : null}
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

export default memo(ListHeader);
