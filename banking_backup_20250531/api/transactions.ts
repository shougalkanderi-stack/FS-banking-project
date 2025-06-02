import instance from "./index";

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  type: "transfer" | "deposit" | "withdraw";
  createdAt: string;
}

export interface TransactionFilters {
  type?: "transfer" | "deposit" | "withdraw";
  search?: string;
}

export const getTransactions = async (
  filters?: TransactionFilters
): Promise<Transaction[]> => {
  try {
    const response = await instance.get("/mini-project/api/transactions/my");
    let transactions = response.data;

    if (filters?.type) {
      transactions = transactions.filter(
        (t: Transaction) => t.type === filters.type
      );
    }

    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      transactions = transactions.filter(
        (t: Transaction) =>
          t.type.toLowerCase().includes(searchLower) &&
          t.amount.toString().includes(searchLower) &&
          new Date(t.createdAt)
            .toLocaleDateString()
            .toLowerCase()
            .includes(searchLower)
      );
    }

    return transactions;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};
