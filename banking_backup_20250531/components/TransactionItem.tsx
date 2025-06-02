import { Transaction } from '@/api/transactions';
import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const getTransactionIcon = (type: string) => {
    if (type === 'transfer') {
      return 'exchange-alt';
    } else if (type === 'deposit') {
      return 'arrow-down';
    } else if (type === 'withdraw') {
      return 'arrow-up';
    } else {
      return 'question';
    }
  };

  const getTransactionColor = (type: string) => {
    return type === 'deposit' ? '#10B981' : '#EF4444';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <View style={styles.transactionItem}>
      <View style={styles.iconContainer}>
        <FontAwesome5 
          name={getTransactionIcon(transaction.type)} 
          size={20} 
          color={getTransactionColor(transaction.type)}
        />
      </View>
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionType}>
          {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
        </Text>
        <Text style={styles.transactionDate}>
          {formatDate(transaction.createdAt)}
        </Text>
      </View>
      <Text style={[
        styles.transactionAmount,
        { color: getTransactionColor(transaction.type) }
      ]}>
        {transaction.type === 'deposit' ? '+' : '-'}{transaction.amount.toFixed(2)} {transaction.currency}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionType: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 14,
    color: '#94A3B8',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TransactionItem; 