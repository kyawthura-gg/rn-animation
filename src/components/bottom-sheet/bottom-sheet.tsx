import { useWindowDimensions } from "react-native";
import React, { forwardRef, memo, Ref, useImperativeHandle } from "react";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { SheetProps, SheetRefProps } from "./sheet.props";

const BottomSheet = forwardRef(
  ({ height, children }: SheetProps, ref: Ref<SheetRefProps>) => {
    const { height: screenHeight } = useWindowDimensions();
    const top = useSharedValue(screenHeight);

    const gestureHandler = useAnimatedGestureHandler({
      onStart: (_, ctx: { top: number }) => {
        ctx.top = top.value;
      },
      onActive: (event, ctx) => {
        const newValue = ctx.top + event.translationY;
        top.value = ctx.top + event.translationY;
        if (newValue < height - 100) {
          top.value = height;
        } else {
          top.value = newValue;
        }
      },
      onEnd: (event) => {
        console.log(height * 0.8);
        if (event.translationY > height * 0.1) {
          top.value = screenHeight;
        } else {
          top.value = height;
        }
      },
    });

    const style = useAnimatedStyle(() => ({
      top: withSpring(top.value, {
        damping: 30,
        mass: 1,
        restSpeedThreshold: 0.1,
        stiffness: 600,
      }),
    }));

    useImperativeHandle(ref, () => ({
      open: () => {
        top.value = height;
      },
      close: () => {
        top.value = screenHeight;
      },
    }));

    return (
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View
          className="flex-1 absolute inset-0 justify-center align-middle bg-white rounded-t-3xl"
          style={[
            {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            },
            style,
          ]}
        >
          {children}
        </Animated.View>
      </PanGestureHandler>
    );
  },
);

export default memo(BottomSheet);
