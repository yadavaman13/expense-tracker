import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from "uuid";

const generateId = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  try {
    return uuidv4();
  } catch (e) {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
};

const useTransactionStore = create(
  persist(
    (set) => ({
      transactions: [],

      addTransaction: (data) => {
        const transaction = {
          id: generateId(),
          type: data.type,
          amount: parseFloat(data.amount),
          category: data.category,
          description: data.description || "",
          date: data.date,
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          transactions: [transaction, ...state.transactions],
        }));
      },

      updateTransaction: (id, data) => {
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id
              ? {
                  ...t,
                  type: data.type !== undefined ? data.type : t.type,
                  amount: data.amount !== undefined ? parseFloat(data.amount) : t.amount,
                  category: data.category !== undefined ? data.category : t.category,
                  description: data.description !== undefined ? data.description : t.description,
                  date: data.date !== undefined ? data.date : t.date,
                }
              : t
          ),
        }));
      },

      deleteTransaction: (id) => {
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        }));
      },
    }),
    {
      name: "expense-tracker-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useTransactionStore;

