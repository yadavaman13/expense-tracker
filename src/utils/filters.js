/**
 * Filter transactions by type, category, month/year, and search query.
 * @param {Array} transactions
 * @param {{ type?: string, category?: string, month?: number, year?: number, searchQuery?: string }} filters
 * @returns {Array} Filtered transactions
 */
export function filterTransactions(transactions, filters = {}) {
  let result = [...transactions];

  if (filters.type && filters.type !== "all") {
    result = result.filter((t) => t.type === filters.type);
  }

  if (filters.category && filters.category !== "all") {
    result = result.filter((t) => t.category === filters.category);
  }

  if (filters.month !== undefined && filters.year !== undefined) {
    result = result.filter((t) => {
      const date = new Date(t.date + "T00:00:00");
      return date.getMonth() === filters.month && date.getFullYear() === filters.year;
    });
  }

  if (filters.searchQuery && filters.searchQuery.trim()) {
    const query = filters.searchQuery.toLowerCase().trim();
    result = result.filter(
      (t) =>
        (t.description || "").toLowerCase().includes(query) ||
        (t.category || "").toLowerCase().includes(query)
    );
  }

  return result;
}

/**
 * Sort transactions by date.
 * @param {Array} transactions
 * @param {"desc"|"asc"} order - Sort order, defaults to "desc" (newest first)
 * @returns {Array} Sorted transactions (new array)
 */
export function sortTransactionsByDate(transactions, order = "desc") {
  return [...transactions].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return order === "desc" ? dateB - dateA : dateA - dateB;
  });
}

