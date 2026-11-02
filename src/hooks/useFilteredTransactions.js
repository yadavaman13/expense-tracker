import { useState, useMemo } from "react";
import { filterTransactions, sortTransactionsByDate } from "../utils/filters";

const DEFAULT_FILTERS = {
  type: "all",
  category: "all",
  searchQuery: "",
};

export default function useFilteredTransactions(transactions) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const filteredTransactions = useMemo(() => {
    const filtered = filterTransactions(transactions, filters);
    return sortTransactionsByDate(filtered, "desc");
  }, [transactions, filters]);

  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  return { filteredTransactions, filters, setFilters, resetFilters };
}

