import { View, StyleSheet, Dimensions } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { BarChart } from "react-native-chart-kit";
import { formatCurrency } from "../../utils/formatters";

const screenWidth = Dimensions.get("window").width;

export default function MonthlyBarChart({ income, expense }) {
  const theme = useTheme();

  if (income === 0 && expense === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text variant="bodyMedium" style={{ color: theme.custom.muted }}>
          No data for this month
        </Text>
      </View>
    );
  }

  const data = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        data: [income, expense],
      },
    ],
  };

  return (
    <View style={styles.container}>
      <BarChart
        data={data}
        width={screenWidth - 64}
        height={200}
        yAxisLabel="₹"
        yAxisSuffix=""
        chartConfig={{
          backgroundColor: "transparent",
          backgroundGradientFrom: theme.colors.surface,
          backgroundGradientTo: theme.colors.surface,
          decimalPlaces: 0,
          color: () => theme.colors.primary,
          labelColor: () => theme.colors.onSurface,
          barPercentage: 0.6,
          propsForBackgroundLines: {
            strokeDasharray: "",
            stroke: theme.colors.outline,
            strokeWidth: 0.5,
          },
        }}
        style={styles.chart}
        fromZero
        showValuesOnTopOfBars
      />

      <View style={styles.summary}>
        <View style={styles.summaryItem}>
          <Text variant="bodySmall" style={{ color: theme.custom.muted }}>
            Income
          </Text>
          <Text variant="bodyLarge" style={{ color: theme.custom.income, fontWeight: "600" }}>
            {formatCurrency(income)}
          </Text>
        </View>
        <View style={styles.summaryItem}>
          <Text variant="bodySmall" style={{ color: theme.custom.muted }}>
            Expenses
          </Text>
          <Text variant="bodyLarge" style={{ color: theme.custom.expense, fontWeight: "600" }}>
            {formatCurrency(expense)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: "center",
  },
  chart: {
    borderRadius: 12,
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 16,
  },
  summaryItem: {
    alignItems: "center",
  },
});
