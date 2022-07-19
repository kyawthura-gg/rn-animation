import React, { FC, useRef } from "react";
import { FlatList, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { FRIENDS } from "../../mocks";
import { HEADER_VALUES } from "../../constants/twitter-profile";
import { HeaderBg, ListHeader } from "../../components/twitter-profile";

export const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const TwitterProfileScreen: FC = () => {
  const imageRef = useRef<Animated.Image>(null);
  const scrollY = useSharedValue(0);

  const translateY = useDerivedValue(() =>
    scrollY.value > 0
      ? Math.min(scrollY.value, HEADER_VALUES.HEADER_BG_HEIGHT)
      : 0,
  );

  const listStyle = useAnimatedStyle(() => ({
    zIndex: translateY.value > 10 ? -20 : 20,
  }));

  return (
    <View className="flex-1 pb-2 bg-black">
      <HeaderBg ref={imageRef} translateY={translateY} />
      <AnimatedFlatList
        style={listStyle}
        className="px-4 -mt-6"
        StickyHeaderComponent={() => (
          <HeaderBg ref={imageRef} translateY={translateY} />
        )}
        stickyHeaderHiddenOnScroll={true}
        ListHeaderComponent={<ListHeader translateY={translateY} />}
        onScroll={(e) => {
          const y = e.nativeEvent.contentOffset.y;
          imageRef.current?.setNativeProps({
            blurRadius: y > 10 ? 10 : y,
          });
          scrollY.value = e.nativeEvent.contentOffset.y;
        }}
        data={[...FRIENDS, ...FRIENDS]}
        //@ts-ignore
        renderItem={({ item }: { item: typeof FRIENDS[number] }) => (
          <View style={{ width: "100%" }}>
            <Text className="my-4 text-xl font-bold text-white">
              {item.name}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default TwitterProfileScreen;
