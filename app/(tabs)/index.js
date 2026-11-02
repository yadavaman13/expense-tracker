import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

export default function DashboardScreen() {
  const theme = useTheme();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.colors.background }}>
      <Text variant="headlineMedium" style={{ color: theme.colors.onBackground }}>
        Expense Tracker
      </Text>
    </View>
  );
}

