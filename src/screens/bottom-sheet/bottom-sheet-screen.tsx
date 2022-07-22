import React, { useRef } from "react";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomSheet, SheetRefProps } from "../../components/bottom-sheet";

export const BottomSheetScreen = () => {
  const sheetRef = useRef<SheetRefProps>(null);

  return (
    <SafeAreaView className="flex-1">
      <Button title="Open sheet" onPress={() => sheetRef.current?.open()} />
      <Button title="Close sheet" onPress={() => sheetRef.current?.close()} />
      <BottomSheet ref={sheetRef} height={400}>
        <Text>Testing</Text>
      </BottomSheet>
    </SafeAreaView>
  );
};
