import { useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Searchbar, useTheme } from "react-native-paper";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import useTransactionStore from "../../src/store/useTransactionStore";
import TransactionList from "../../src/components/TransactionList";
import FilterBar from "../../src/components/FilterBar";
import DeleteConfirmDialog from "../../src/components/DeleteConfirmDialog";
import useFilteredTransactions from "../../src/hooks/useFilteredTransactions";

export default function TransactionsScreen() {
  const theme = useTheme();
  const transactions = useTransactionStore((state) => state.transactions);
  const deleteTransaction = useTransactionStore((state) => state.deleteTransaction);

  const { filteredTransactions, filters, setFilters } = useFilteredTransactions(transactions);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const handlePressTransaction = useCallback((transaction) => {
    router.push(`/transaction/${transaction.id}`);
  }, []);

  const handleLongPressTransaction = useCallback((transaction) => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (e) {
      // ignore
    }
    setDeleteTarget(transaction);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (deleteTarget) {
      deleteTransaction(deleteTarget.id);
      try {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      } catch (e) {
        // ignore
      }
    }
    setDeleteTarget(null);
  }, [deleteTarget, deleteTransaction]);

  const handleSearchChange = useCallback(
    (query) => {
      setFilters((prev) => ({ ...prev, searchQuery: query }));
    },
    [setFilters]
  );

  const ListHeader = (
    <View>
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search transactions..."
          value={filters.searchQuery}
          onChangeText={handleSearchChange}
          style={[styles.searchbar, { backgroundColor: theme.colors.surface }]}
          inputStyle={{ color: theme.colors.onBackground }}
          iconColor={theme.custom.muted}
          placeholderTextColor={theme.custom.muted}
        />
      </View>
      <FilterBar filters={filters} onFilterChange={setFilters} />
      <View style={styles.countContainer}>
        <Text variant="bodySmall" style={{ color: theme.custom.muted }}>
          {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? "s" : ""}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
      <View style={styles.titleBar}>
        <Text
          variant="headlineSmall"
          style={{ color: theme.colors.onBackground, fontWeight: "bold" }}
        >
          Transactions
        </Text>
      </View>

      <TransactionList
        transactions={filteredTransactions}
        onPressTransaction={handlePressTransaction}
        onLongPressTransaction={handleLongPressTransaction}
        emptyMessage="No transactions match your filters"
        ListHeaderComponent={ListHeader}
      />

      <DeleteConfirmDialog
        visible={!!deleteTarget}
        onDismiss={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
      />
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
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  searchbar: {
    borderRadius: 12,
    elevation: 0,
  },
  countContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
});
