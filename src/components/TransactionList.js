import { FlatList, StyleSheet } from "react-native";
import TransactionCard from "./TransactionCard";
import EmptyState from "./EmptyState";

export default function TransactionList({
  transactions,
  onPressTransaction,
  onLongPressTransaction,
  emptyMessage = "No transactions yet",
  ListHeaderComponent,
}) {
  const renderItem = ({ item }) => (
    <TransactionCard
      transaction={item}
      onPress={() => onPressTransaction?.(item)}
      onLongPress={() => onLongPressTransaction?.(item)}
    />
  );

  return (
    <FlatList
      data={transactions}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={<EmptyState message={emptyMessage} />}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 16,
    paddingBottom: 100,
    flexGrow: 1,
  },
});
