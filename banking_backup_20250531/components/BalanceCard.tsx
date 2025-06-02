import { Transaction } from '@/api/transactions';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface BalanceCardProps {
  transactions: Transaction[];
}

const BalanceCard: React.FC<BalanceCardProps> = ({ transactions }) => {
  let totalBalance = 0;
  const currency = transactions[0]?.currency || 'KWD';

  transactions.forEach((transaction) => {
    const amount = transaction.amount;
    if (transaction.type === 'deposit') {
      totalBalance += amount;
    } else if (transaction.type === 'withdraw' || transaction.type === 'transfer') {
      totalBalance -= amount;
    }
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Current Balance</Text>
      <Text style={styles.amount}>{totalBalance.toFixed(2)} {currency}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    color: '#94A3B8',
    marginBottom: 8,
  },
  amount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default BalanceCard; 