import { Transaction } from "@/api/transactions";
import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface TransactionItemProps {
  transaction: Transaction;
}

/**
 * TransactionItem Component
 * Displays a single transaction with an icon, type, date, and amount
 */
const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  // Ensure we have valid transaction data
  if (!transaction) {
    return null;
  }

  /**
   * Get the appropriate icon name based on transaction type
   */
  const getTransactionIcon = (type: "transfer" | "deposit" | "withdraw") => {
    switch (type) {
      case "transfer":
        return "exchange-alt"; // Two-way arrow icon
      case "deposit":
        return "arrow-down"; // Downward arrow for money coming in
      case "withdraw":
        return "arrow-up"; // Upward arrow for money going out
      default:
        return "question"; // Fallback icon
    }
  };

  /**
   * Get the color for the transaction based on its type
   * Green for deposits (money in)
   * Red for withdrawals and transfers (money out)
   */
  const getTransactionColor = (type: string) => {
    return type === "deposit" ? "#10B981" : "#EF4444";
  };

  /**
   * Format the date to be more readable
   * Example: "Mar 21, 2024"
   */
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      return "Invalid Date";
    }
  };

  // Get safe values with fallbacks
  const amount = transaction?.amount ?? 0;
  const type = transaction?.type ?? "transfer";
  const currency = transaction?.currency ?? "KWD";
  const createdAt = transaction?.createdAt ?? new Date().toISOString();

  // Render the transaction item
  return (
    <View style={styles.transactionItem}>
      {/* Icon section */}
      <View style={styles.iconContainer}>
        <FontAwesome5
          name={getTransactionIcon(type)}
          size={20}
          color={getTransactionColor(type)}
        />
      </View>

      {/* Transaction details section */}
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionType}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Text>
        <Text style={styles.transactionDate}>{formatDate(createdAt)}</Text>
      </View>

      {/* Amount section */}
      <Text
        style={[styles.transactionAmount, { color: getTransactionColor(type) }]}
      >
        {type === "deposit" ? "+" : "-"}
        {amount.toFixed(2)} {currency}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  transactionItem: {
    flexDirection: "row", // Layout items horizontally
    alignItems: "center", // Center items vertically
    backgroundColor: "#74518711",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20, // Make it circular
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center", // Center icon vertically
    alignItems: "center", // Center icon horizontally
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1, // Take up remaining space
  },
  transactionType: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 14,
    color: "#94A3B8", // Lighter color for secondary text
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default TransactionItem;
