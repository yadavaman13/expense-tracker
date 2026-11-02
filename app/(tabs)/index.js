import { useMemo, useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { Text, FAB, useTheme } from "react-native-paper";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import useTransactionStore from "../../src/store/useTransactionStore";
import BalanceSummary from "../../src/components/BalanceSummary";
import TransactionList from "../../src/components/TransactionList";
import DeleteConfirmDialog from "../../src/components/DeleteConfirmDialog";
import { calculateBalance } from "../../src/utils/calculations";
import { sortTransactionsByDate } from "../../src/utils/filters";

export default function DashboardScreen() {
  const theme = useTheme();
  const transactions = useTransactionStore((state) => state.transactions);
  const deleteTransaction = useTransactionStore((state) => state.deleteTransaction);

  const [deleteTarget, setDeleteTarget] = useState(null);

  const { balance, totalIncome, totalExpense } = useMemo(
    () => calculateBalance(transactions),
    [transactions]
  );

  const recentTransactions = useMemo(
    () => sortTransactionsByDate(transactions, "desc").slice(0, 5),
    [transactions]
  );

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

  const ListHeader = useMemo(
    () => (
      <View>
        <BalanceSummary
          balance={balance}
          totalIncome={totalIncome}
          totalExpense={totalExpense}
        />
        <View style={styles.sectionHeader}>
          <Text
            variant="titleMedium"
            style={{ color: theme.colors.onBackground, fontWeight: "600" }}
          >
            Recent Transactions
          </Text>
        </View>
      </View>
    ),
    [balance, totalIncome, totalExpense, theme]
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
      <View style={styles.titleBar}>
        <Text
          variant="headlineSmall"
          style={{ color: theme.colors.onBackground, fontWeight: "bold" }}
        >
          Dashboard
        </Text>
      </View>

      <TransactionList
        transactions={recentTransactions}
        onPressTransaction={handlePressTransaction}
        onLongPressTransaction={handleLongPressTransaction}
        emptyMessage="No transactions yet. Tap + to add one."
        ListHeaderComponent={ListHeader}
      />

      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        color={theme.colors.onPrimary}
        onPress={() => router.push("/transaction/add")}
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
  sectionHeader: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 12,
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 24,
    borderRadius: 28,
  },
});
