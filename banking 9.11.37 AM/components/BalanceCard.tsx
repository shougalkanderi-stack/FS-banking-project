import { Transaction } from "@/api/transactions";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

/**
 * Props for the BalanceCard component
 */
interface BalanceCardProps {
  transactions: Transaction[]; // Array of transactions to calculate balance from
}

/**
 * BalanceCard Component
 * Displays the current balance calculated from all transactions
 *
 * @param transactions - Array of transactions to calculate balance from
 */
const BalanceCard: React.FC<BalanceCardProps> = ({ transactions }) => {
  // Initialize balance and get currency from first transaction
  let totalBalance = 0;
  const currency = transactions[0]?.currency || "KWD"; // Default to KWD if no transactions

  console.log("Calculating balance for transactions:", transactions); // Debug log

  // Calculate total balance
  transactions.forEach((transaction) => {
    const amount = transaction.amount;
    console.log(
      `Processing transaction: Type=${transaction.type}, Amount=${amount}`
    ); // Debug log

    // Add deposits, subtract withdrawals and transfers
    if (transaction.type === "deposit") {
      totalBalance += amount; // Add deposit amount
      console.log(`After deposit: Balance=${totalBalance}`); // Debug log
    } else if (
      transaction.type === "withdraw" ||
      transaction.type === "transfer"
    ) {
      totalBalance -= amount; // Subtract withdrawal/transfer amount
      console.log(`After withdraw/transfer: Balance=${totalBalance}`); // Debug log
    }
  });

  console.log("Final balance:", totalBalance); // Debug log

  const params = useLocalSearchParams();
  // If URL is /home?filter=deposit
  console.log(params.filter); // outputs: "deposit"

  // Render the balance card
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Current Balance</Text>
      <Text style={styles.amount}>
        {/* Format balance to 2 decimal places */}
        {totalBalance.toFixed(2)} {currency}
      </Text>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.08)", // Semi-transparent background
    borderRadius: 16, // Rounded corners
    padding: 20, // Inner spacing
    marginBottom: 24, // Space below the card
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)", // Semi-transparent border
  },
  label: {
    fontSize: 14, // Smaller text for label
    color: "#94A3B8", // Light gray text
    marginBottom: 4, // Space below label
  },
  amount: {
    fontSize: 32, // Large text for amount
    fontWeight: "700", // Bold font
    color: "#FFFFFF", // White text
  },
});

export default BalanceCard;
