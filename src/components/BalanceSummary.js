import { View, StyleSheet } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { formatCurrency } from "../utils/formatters";

export default function BalanceSummary({ balance, totalIncome, totalExpense }) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={[styles.balanceCard, { backgroundColor: theme.colors.primary }]}>
        <Text variant="bodyMedium" style={{ color: theme.colors.onPrimary, opacity: 0.8 }}>
          Total Balance
        </Text>
        <Text variant="headlineLarge" style={{ color: theme.colors.onPrimary, fontWeight: "bold" }}>
          {formatCurrency(balance)}
        </Text>
      </View>

      <View style={styles.row}>
        <View style={[styles.summaryCard, { backgroundColor: theme.colors.surface }]}>
          <Text variant="bodySmall" style={{ color: theme.custom.muted }}>
            Income
          </Text>
          <Text variant="titleMedium" style={{ color: theme.custom.income, fontWeight: "600" }}>
            +{formatCurrency(totalIncome)}
          </Text>
        </View>

        <View style={{ width: 12 }} />

        <View style={[styles.summaryCard, { backgroundColor: theme.colors.surface }]}>
          <Text variant="bodySmall" style={{ color: theme.custom.muted }}>
            Expenses
          </Text>
          <Text variant="titleMedium" style={{ color: theme.custom.expense, fontWeight: "600" }}>
            -{formatCurrency(totalExpense)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  balanceCard: {
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
  },
  summaryCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
});
