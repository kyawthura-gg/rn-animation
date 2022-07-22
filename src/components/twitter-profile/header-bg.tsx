import React, { forwardRef, memo } from "react";
import { StyleSheet, Text } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { HEADER_VALUES } from "../../constants/twitter-profile";

const HeaderBg = forwardRef<
  Animated.Image,
  { translateY: Readonly<Animated.SharedValue<number>> }
>(({ translateY }, ref) => {
  const headerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY:
          translateY.value >= HEADER_VALUES.HEADER_DIFF
            ? -HEADER_VALUES.HEADER_DIFF
            : -translateY.value,
      },
    ],
  }));

  const bgTextOverlayStyle = useAnimatedStyle(() => ({
    opacity: translateY.value > HEADER_VALUES.HEADER_DIFF ? 1 : 0,
  }));

  return (
    <Animated.View style={headerStyle}>
      <Animated.Image
        ref={ref}
        source={{
          uri: "https://pbs.twimg.com/profile_banners/44196397/1576183471/1080x360",
        }}
        className=" w-full h-[140px] z-20"
      />
      <Animated.View
        className="z-30 absolute left-0 right-0 bottom-3"
        style={bgTextOverlayStyle}
      >
        <Text className="font-bold text-center text-white text-xl">
          Elon Musk
        </Text>
        <Text className="text-center text-white text-xs">89 Tweets</Text>
      </Animated.View>
    </Animated.View>
  );
});

export default HeaderBg;

const styles = StyleSheet.create({
  headerBg: {
    width: "100%",
    height: HEADER_VALUES.HEADER_BG_HEIGHT,
    zIndex: 20,
  },
});
