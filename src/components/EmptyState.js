import { View, StyleSheet } from "react-native";
import { Text, useTheme } from "react-native-paper";

export default function EmptyState({ message = "Nothing here yet" }) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text variant="bodyLarge" style={{ color: theme.custom.muted, textAlign: "center" }}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 48,
  },
});
