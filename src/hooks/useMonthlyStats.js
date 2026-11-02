import { useMemo } from "react";
import { filterTransactions } from "../utils/filters";
import { calculateBalance, calculateCategoryTotals } from "../utils/calculations";

export default function useMonthlyStats(transactions, month, year) {
  return useMemo(() => {
    const monthlyTransactions = filterTransactions(transactions, { month, year });
    const { balance, totalIncome, totalExpense } = calculateBalance(monthlyTransactions);
    const categoryTotals = calculateCategoryTotals(monthlyTransactions, "expense");

    const topCategory = categoryTotals.length > 0 ? categoryTotals[0] : null;

    return {
      monthlyTransactions,
      totalIncome,
      totalExpense,
      balance,
      categoryTotals,
      topCategory,
      transactionCount: monthlyTransactions.length,
    };
  }, [transactions, month, year]);
}
