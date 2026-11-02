import { View, StyleSheet, Dimensions } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { PieChart } from "react-native-chart-kit";
import { formatCurrency } from "../../utils/formatters";

const CHART_COLORS = [
  "#1A1A1A",
  "#4A4A4A",
  "#6E6E6E",
  "#8E8E8E",
  "#AEAEAE",
  "#C8C8C8",
  "#DEDEDE",
  "#F0F0F0",
];

const screenWidth = Dimensions.get("window").width;

export default function SpendingPieChart({ data }) {
  const theme = useTheme();

  if (!data || data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text variant="bodyMedium" style={{ color: theme.custom.muted }}>
          No expense data for this month
        </Text>
      </View>
    );
  }

  const chartData = data.map((item, index) => ({
    name: item.category,
    amount: item.total,
    color: CHART_COLORS[index % CHART_COLORS.length],
    legendFontColor: theme.colors.onSurface,
    legendFontSize: 12,
  }));

  return (
    <View style={styles.container}>
      <PieChart
        data={chartData}
        width={screenWidth - 32}
        height={200}
        chartConfig={{
          color: () => theme.colors.onBackground,
        }}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="0"
        absolute={false}
      />

      {/* Legend with amounts */}
      <View style={styles.legend}>
        {data.map((item, index) => (
          <View key={item.category} style={styles.legendItem}>
            <View
              style={[
                styles.legendDot,
                { backgroundColor: CHART_COLORS[index % CHART_COLORS.length] },
              ]}
            />
            <Text
              variant="bodySmall"
              style={{ color: theme.colors.onSurface, flex: 1 }}
            >
              {item.category}
            </Text>
            <Text variant="bodySmall" style={{ color: theme.custom.muted }}>
              {formatCurrency(item.total)} ({item.percentage}%)
            </Text>
          </View>
        ))}
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
  legend: {
    width: "100%",
    paddingHorizontal: 16,
    marginTop: 8,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
});
