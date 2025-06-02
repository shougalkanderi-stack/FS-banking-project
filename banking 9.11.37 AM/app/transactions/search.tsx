import { useQuery } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

// Define TypeScript interfaces
interface Transaction {
  id: string;
  date: string;
  amount: number;
  description: string;
  type: "credit" | "debit";
}

interface SearchFilters {
  startDate: string;
  endDate: string;
  minAmount: string;
  maxAmount: string;
}

const SearchTransactions = () => {
  // State for search filters
  const [filters, setFilters] = useState<SearchFilters>({
    startDate: "",
    endDate: "",
    minAmount: "",
    maxAmount: "",
  });

  // Mock API call - Replace this with your actual API call
  const fetchTransactions = async (filters: SearchFilters) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // This is where you would make your actual API call
    // For now, returning mock data
    return [
      {
        id: "1",
        date: "2024-03-20",
        amount: 1500.0,
        description: "Salary Deposit",
        type: "credit",
      },
      {
        id: "2",
        date: "2024-03-19",
        amount: -50.0,
        description: "Grocery Shopping",
        type: "debit",
      },
    ] as Transaction[];
  };

  // Query hook for fetching transactions
  const { data: transactions, isLoading } = useQuery({
    queryKey: ["transactions", filters],
    queryFn: () => fetchTransactions(filters),
  });

  const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
    return (
      <View style={styles.transactionItem}>
        <View style={styles.transactionHeader}>
          <Text style={styles.transactionDate}>{transaction.date}</Text>
          <Text
            style={[
              styles.transactionAmount,
              { color: transaction.type === "credit" ? "#10B981" : "#EF4444" },
            ]}
          >
            {transaction.type === "credit" ? "+" : "-"}$
            {Math.abs(transaction.amount)}
          </Text>
        </View>
        <Text style={styles.transactionDescription}>
          {transaction.description}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <StatusBar style="light" />

        {/* Search Filters */}
        <View style={styles.searchContainer}>
          <Text style={styles.title}>Search Transactions</Text>

          {/* Date Filters */}
          <View style={styles.dateFilters}>
            <TextInput
              style={styles.dateInput}
              placeholder="Start Date (YYYY-MM-DD)"
              placeholderTextColor="#A0AEC0"
              value={filters.startDate}
              onChangeText={(text) =>
                setFilters((prev) => ({ ...prev, startDate: text }))
              }
            />
            <TextInput
              style={styles.dateInput}
              placeholder="End Date (YYYY-MM-DD)"
              placeholderTextColor="#A0AEC0"
              value={filters.endDate}
              onChangeText={(text) =>
                setFilters((prev) => ({ ...prev, endDate: text }))
              }
            />
          </View>

          {/* Amount Filters */}
          <View style={styles.amountFilters}>
            <TextInput
              style={styles.amountInput}
              placeholder="Min Amount"
              placeholderTextColor="#A0AEC0"
              keyboardType="numeric"
              value={filters.minAmount}
              onChangeText={(text) =>
                setFilters((prev) => ({ ...prev, minAmount: text }))
              }
            />
            <TextInput
              style={styles.amountInput}
              placeholder="Max Amount"
              placeholderTextColor="#A0AEC0"
              keyboardType="numeric"
              value={filters.maxAmount}
              onChangeText={(text) =>
                setFilters((prev) => ({ ...prev, maxAmount: text }))
              }
            />
          </View>
        </View>

        {/* Results */}
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="#745187"
            style={styles.loader}
          />
        ) : (
          <FlatList
            data={transactions}
            renderItem={({ item }) => <TransactionItem transaction={item} />}
            keyExtractor={(item) => item.id}
            style={styles.transactionList}
            contentContainerStyle={styles.transactionListContent}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f0dcf5",
  },
  container: {
    flex: 1,
    backgroundColor: "#f0dcf5",
  },
  searchContainer: {
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
  },
  dateFilters: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  dateInput: {
    flex: 0.48,
    backgroundColor: "#74518711",
    padding: 16,
    borderRadius: 12,
    color: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  amountFilters: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  amountInput: {
    flex: 0.48,
    backgroundColor: "#74518711",
    padding: 16,
    borderRadius: 12,
    color: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  transactionList: {
    flex: 1,
  },
  transactionListContent: {
    padding: 20,
  },
  transactionItem: {
    backgroundColor: "#74518711",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  transactionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  transactionDate: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  transactionDescription: {
    color: "#94A3B8",
    fontSize: 14,
  },
});

export default SearchTransactions;
