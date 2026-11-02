import { memo } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { formatCurrency, formatDateShort } from "../utils/formatters";

function TransactionCard({ transaction, onPress, onLongPress }) {
  const theme = useTheme();
  const isIncome = transaction.type === "income";
  const amountColor = isIncome ? theme.custom.income : theme.custom.expense;
  const amountPrefix = isIncome ? "+" : "-";

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: pressed ? theme.colors.surfaceVariant : theme.colors.surface },
      ]}
      android_ripple={{ color: theme.colors.surfaceVariant }}
    >
      <View style={styles.left}>
        <View style={[styles.categoryDot, { backgroundColor: amountColor }]} />
        <View style={styles.info}>
          <Text variant="bodyLarge" style={{ color: theme.colors.onBackground }} numberOfLines={1}>
            {transaction.category}
          </Text>
          {transaction.description ? (
            <Text variant="bodySmall" style={{ color: theme.custom.muted }} numberOfLines={1}>
              {transaction.description}
            </Text>
          ) : null}
        </View>
      </View>

      <View style={styles.right}>
        <Text variant="bodyLarge" style={{ color: amountColor, fontWeight: "600" }}>
          {amountPrefix}{formatCurrency(transaction.amount)}
        </Text>
        <Text variant="bodySmall" style={{ color: theme.custom.muted }}>
          {formatDateShort(transaction.date)}
        </Text>
      </View>
    </Pressable>
  );
}

export default memo(TransactionCard);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12,
  },
  categoryDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  right: {
    alignItems: "flex-end",
  },
});
