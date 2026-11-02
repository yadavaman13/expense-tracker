/**
 * Calculate balance, total income, and total expenses from transactions.
 * @param {Array} transactions - Array of transaction objects
 * @returns {{ balance: number, totalIncome: number, totalExpense: number }}
 */
export function calculateBalance(transactions) {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    balance: totalIncome - totalExpense,
    totalIncome,
    totalExpense,
  };
}

/**
 * Calculate spending totals per category.
 * @param {Array} transactions - Array of transaction objects
 * @param {"income"|"expense"} type - Transaction type to aggregate
 * @returns {Array<{ category: string, total: number, percentage: number }>}
 */
export function calculateCategoryTotals(transactions, type) {
  const filtered = transactions.filter((t) => t.type === type);
  const grandTotal = filtered.reduce((sum, t) => sum + t.amount, 0);

  if (grandTotal === 0) return [];

  const categoryMap = {};
  filtered.forEach((t) => {
    categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
  });

  return Object.entries(categoryMap)
    .map(([category, total]) => ({
      category,
      total,
      percentage: Math.round((total / grandTotal) * 100),
    }))
    .sort((a, b) => b.total - a.total);
}
