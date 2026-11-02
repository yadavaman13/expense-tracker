import { View, StyleSheet } from "react-native";
import { SegmentedButtons, useTheme } from "react-native-paper";
import CategoryPicker from "./CategoryPicker";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../constants/categories";

const TYPE_BUTTONS = [
  { value: "all", label: "All" },
  { value: "income", label: "Income" },
  { value: "expense", label: "Expense" },
];

export default function FilterBar({ filters, onFilterChange }) {
  const theme = useTheme();

  const allCategories = [...new Set([...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES])];
  const categoryOptions =
    filters.type === "income"
      ? INCOME_CATEGORIES
      : filters.type === "expense"
      ? EXPENSE_CATEGORIES
      : allCategories;

  return (
    <View style={styles.container}>
      <View style={styles.segmentContainer}>
        <SegmentedButtons
          value={filters.type || "all"}
          onValueChange={(value) => onFilterChange({ ...filters, type: value, category: "all" })}
          buttons={TYPE_BUTTONS}
          density="small"
          style={styles.segment}
          theme={{
            colors: {
              secondaryContainer: theme.colors.primary,
              onSecondaryContainer: theme.colors.onPrimary,
            },
          }}
        />
      </View>

      <CategoryPicker
        categories={["All", ...categoryOptions]}
        selected={filters.category === "all" ? "All" : filters.category}
        onSelect={(cat) => onFilterChange({ ...filters, category: cat === "All" ? "all" : cat })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
  },
  segmentContainer: {
    paddingHorizontal: 16,
  },
  segment: {
    marginBottom: 4,
  },
});

