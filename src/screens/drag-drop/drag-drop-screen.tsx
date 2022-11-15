import React, { useState } from "react";
import { Image, Text, useWindowDimensions, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  cancelAnimation,
  runOnJS,
  scrollTo,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FRIENDS } from "../../mocks";

type MoveableProps = typeof FRIENDS[number] & {
  id: number;
  positions: any;
  scrollY: Animated.SharedValue<number>;
};

const SONG_HEIGHT = 100;

function clamp(value: number, lowerBound: number, upperBound: number) {
  "worklet";
  return Math.max(lowerBound, Math.min(value, upperBound));
}

function objectMove(object: any, from: number, to: number) {
  "worklet";
  const newObject = Object.assign({}, object);
  for (const id in object) {
    if (object[id] === from) {
      newObject[id] = to;
    }

    if (object[id] === to) {
      newObject[id] = from;
    }
  }
  return newObject;
}

function listToObject(list: typeof FRIENDS) {
  const values = Object.values(list);
  const object = {} as any;

  for (let i = 0; i < values.length; i++) {
    object[values[i].id] = i;
  }
  return object;
}

function Song({ name, photo }: { name: string; photo: string }) {
  return (
    <View className="flex-row items-center h-[70px] p-2">
      <Image source={{ uri: photo }} className="h-[50px] w-[50px] rounded-lg" />
      <View className="ml-2">
        <Text className="font-bold mb-1">{name}</Text>
        <Text className="text-xs text-gray-500">{name}</Text>
      </View>
    </View>
  );
}

function MoveableSong({ id, positions, name, photo, scrollY }: MoveableProps) {
  const dimensions = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [moving, setMoving] = useState(false);
  const top = useSharedValue(positions.value[id] * SONG_HEIGHT);
  const songsCount = FRIENDS.length;

  useAnimatedReaction(
    () => positions.value[id],
    (currentPosition, previousPosition) => {
      if (currentPosition !== previousPosition) {
        if (!moving) {
          top.value = withSpring(currentPosition * SONG_HEIGHT);
        }
      }
    },
    [moving],
  );

  const gestureHandler = useAnimatedGestureHandler({
    onStart() {
      runOnJS(setMoving)(true);
    },
    onActive(event) {
      const positionY = event.absoluteY + scrollY.value;

      if (positionY <= scrollY.value + SONG_HEIGHT) {
        // Scroll up
        scrollY.value = withTiming(0, { duration: 1500 });
      } else if (positionY >= scrollY.value + dimensions.height - SONG_HEIGHT) {
        // Scroll down
        const contentHeight = songsCount * SONG_HEIGHT;
        const containerHeight = dimensions.height - insets.top - insets.bottom;
        const maxScroll = contentHeight - containerHeight;
        scrollY.value = withTiming(maxScroll, { duration: 1500 });
      } else {
        cancelAnimation(scrollY);
      }

      top.value = withTiming(positionY - SONG_HEIGHT, {
        duration: 16,
      });

      const newPosition = clamp(
        Math.floor(positionY / SONG_HEIGHT),
        0,
        songsCount - 1,
      );

      if (newPosition !== positions.value[id]) {
        positions.value = objectMove(
          positions.value,
          positions.value[id],
          newPosition,
        );
      }
    },
    onFinish() {
      top.value = positions.value[id] * SONG_HEIGHT;
      runOnJS(setMoving)(false);
    },
  });

  console.log(positions.value[id] * SONG_HEIGHT);

  const animatedStyle = useAnimatedStyle(
    () => ({
      position: "absolute",
      left: 0,
      right: 0,
      top: top.value ? top.value : 0,
      zIndex: moving ? 200 : 0,
      shadowColor: "black",
      shadowOffset: {
        height: 0,
        width: 0,
      },
      shadowOpacity: withSpring(moving ? 0.2 : 0),
      shadowRadius: 10,
    }),
    [moving],
  );

  return (
    <Animated.View style={animatedStyle}>
      <View className={moving ? "z-40 bg-white shadow-sm" : ""}>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View className="max-w-[80%]">
            <Song name={name} photo={photo} />
          </Animated.View>
        </PanGestureHandler>
      </View>
    </Animated.View>
  );
}

export const DragDropScreen = () => {
  const positions = useSharedValue(listToObject(FRIENDS));
  const scrollY = useSharedValue(0);
  const scrollViewRef = useAnimatedRef();

  useAnimatedReaction(
    () => scrollY.value,
    (scrolling) => scrollTo(scrollViewRef, 0, scrolling, false),
  );

  const handleScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  return (
    <Animated.FlatList
      data={FRIENDS}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      style={{
        flex: 1,
        position: "relative",
        backgroundColor: "white",
      }}
      contentContainerStyle={{
        height: FRIENDS.length * SONG_HEIGHT,
      }}
      renderItem={({ item, index }) => (
        <MoveableSong
          key={index}
          positions={positions}
          id={index}
          name={item.name}
          photo={item.photo}
          scrollY={scrollY}
        />
      )}
    />
  );
};
