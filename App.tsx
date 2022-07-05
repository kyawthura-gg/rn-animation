import { StyleSheet } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { MainNavigator } from "./src/navigators";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TailwindProvider } from "tailwindcss-react-native";

export default function App() {
  return (
    <SafeAreaProvider>
      <TailwindProvider>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </TailwindProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
