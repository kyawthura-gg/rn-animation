import React, { FC, useCallback, useRef, useState } from "react";
import {
  FlatList,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { FRIENDS } from "../../mocks";

export const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const headerBgHeight = 140;
const textHeight = 100;

const TwitterProfileScreen: FC = () => {
  const imageRef = useRef<Animated.Image>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const scrollY = useSharedValue(0);

  const translateY = useDerivedValue(() =>
    scrollY.value > 0 ? Math.min(scrollY.value, headerHeight) : 0,
  );

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY:
          headerHeight - translateY.value < textHeight
            ? textHeight - headerBgHeight
            : -translateY.value,
      },
    ],
    marginBottom: -translateY.value,
  }));

  const imageStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(translateY.value, [0, 140], [1, 0]),
      },
    ],
    zIndex: translateY.value > 30 ? -10 : 20,
  }));

  const listStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: 10,
      },
    ],
  }));

  const collapsedOverlayAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: translateY.value < 60 ? -translateY.value : -60,
      },
    ],
    opacity: translateY.value > headerBgHeight - textHeight ? 1 : 0,
  }));

  const handleHeaderLayout = useCallback(
    (event: LayoutChangeEvent) =>
      setHeaderHeight(event.nativeEvent.layout.height),
    [],
  );

  return (
    <View className="flex-1 pb-2">
      <Animated.Image
        ref={imageRef}
        source={{
          uri: "https://pbs.twimg.com/profile_banners/44196397/1576183471/1080x360",
        }}
        onLayout={handleHeaderLayout}
        style={[styles.headerBg, headerAnimatedStyle]}
      />
      <Animated.View
        className="z-30"
        style={[styles.bgText, collapsedOverlayAnimatedStyle]}
      >
        <Text className="font-bold text-center text-red-400 text-xl">Kyaw</Text>
      </Animated.View>
      <Animated.Image
        source={{
          uri: "https://pbs.twimg.com/profile_images/1529956155937759233/Nyn1HZWF_400x400.jpg",
        }}
        style={imageStyle}
        className="w-14 h-14 rounded-full z-20 ml-4 -mt-3"
      />

      <AnimatedFlatList
        style={listStyle}
        onScroll={(e) => {
          const y = e.nativeEvent.contentOffset.y;
          imageRef.current?.setNativeProps({
            blurRadius: y > 10 ? 10 : y,
          });
          scrollY.value = e.nativeEvent.contentOffset.y;
        }}
        data={FRIENDS}
        renderItem={({ item }) => (
          <View style={{ width: "100%" }}>
            <Text className="m-4 text-xl font-bold">{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerBg: {
    width: "100%",
    height: headerBgHeight,
    zIndex: 20,
  },
  bgText: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 100,
    height: headerBgHeight,
    justifyContent: "flex-end",
    opacity: 0,
  },
});

export default TwitterProfileScreen;
