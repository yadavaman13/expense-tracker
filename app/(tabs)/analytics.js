import { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Text, IconButton, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import useTransactionStore from "../../src/store/useTransactionStore";
import useMonthlyStats from "../../src/hooks/useMonthlyStats";
import SpendingPieChart from "../../src/components/charts/SpendingPieChart";
import MonthlyBarChart from "../../src/components/charts/MonthlyBarChart";
import { getMonthName, formatCurrency } from "../../src/utils/formatters";

export default function AnalyticsScreen() {
  const theme = useTheme();
  const transactions = useTransactionStore((state) => state.transactions);

  const now = new Date();
  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());

  const {
    totalIncome,
    totalExpense,
    categoryTotals,
    topCategory,
    transactionCount,
  } = useMonthlyStats(transactions, month, year);

  const goToPreviousMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const goToNextMonth = () => {
    const isCurrentMonth = month === now.getMonth() && year === now.getFullYear();
    if (isCurrentMonth) return;

    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const isCurrentMonth = month === now.getMonth() && year === now.getFullYear();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
      <View style={styles.titleBar}>
        <Text
          variant="headlineSmall"
          style={{ color: theme.colors.onBackground, fontWeight: "bold" }}
        >
          Analytics
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Month Navigator */}
        <View style={styles.monthNav}>
          <IconButton
            icon="chevron-left"
            size={28}
            onPress={goToPreviousMonth}
            iconColor={theme.colors.onBackground}
          />
          <Text variant="titleLarge" style={{ color: theme.colors.onBackground, fontWeight: "600" }}>
            {getMonthName(month)} {year}
          </Text>
          <IconButton
            icon="chevron-right"
            size={28}
            onPress={goToNextMonth}
            iconColor={isCurrentMonth ? theme.colors.outline : theme.colors.onBackground}
            disabled={isCurrentMonth}
          />
        </View>

        {/* Stats Cards */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: theme.colors.surface }]}>
            <Text variant="bodySmall" style={{ color: theme.custom.muted }}>
              Transactions
            </Text>
            <Text variant="titleLarge" style={{ color: theme.colors.onBackground, fontWeight: "bold" }}>
              {transactionCount}
            </Text>
          </View>
          <View style={{ width: 12 }} />
          <View style={[styles.statCard, { backgroundColor: theme.colors.surface }]}>
            <Text variant="bodySmall" style={{ color: theme.custom.muted }}>
              Top Category
            </Text>
            <Text
              variant="titleMedium"
              style={{ color: theme.colors.onBackground, fontWeight: "bold" }}
              numberOfLines={1}
            >
              {topCategory ? topCategory.category : "—"}
            </Text>
            {topCategory ? (
              <Text variant="bodySmall" style={{ color: theme.custom.muted }}>
                {formatCurrency(topCategory.total)}
              </Text>
            ) : null}
          </View>
        </View>

        {/* Income vs Expense Bar Chart */}
        <View style={styles.section}>
          <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>
            Income vs Expenses
          </Text>
          <View style={[styles.chartCard, { backgroundColor: theme.colors.surface }]}>
            <MonthlyBarChart income={totalIncome} expense={totalExpense} />
          </View>
        </View>

        {/* Category Breakdown Pie Chart */}
        <View style={styles.section}>
          <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>
            Expense Breakdown
          </Text>
          <View style={[styles.chartCard, { backgroundColor: theme.colors.surface }]}>
            <SpendingPieChart data={categoryTotals} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  titleBar: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  container: {
    paddingBottom: 40,
  },
  monthNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  statsRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontWeight: "600",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  chartCard: {
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
  },
});
