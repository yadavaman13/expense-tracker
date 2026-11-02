import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LogBox, Platform } from "react-native";
import theme from "../src/constants/theme";

// Suppress known non-fatal React 19 / react-native-svg DOM property warnings on web
LogBox.ignoreLogs([
  "Invalid DOM property `transform-origin`",
  /Invalid DOM property/,
]);

if (Platform.OS === "web" && typeof window !== "undefined") {
  const originalError = console.error;
  console.error = (...args) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("Invalid DOM property")
    ) {
      return;
    }
    originalError(...args);
  };
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: theme.colors.background },
            animation: "slide_from_right",
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="transaction/add"
            options={{ presentation: "modal", animation: "slide_from_bottom" }}
          />
          <Stack.Screen name="transaction/[id]" />
        </Stack>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
