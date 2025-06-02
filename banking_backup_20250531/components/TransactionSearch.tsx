import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

interface TransactionSearchProps {
  onSearch: (text: string) => void;
  value: string;
}

const TransactionSearch: React.FC<TransactionSearchProps> = ({ onSearch, value }) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search transactions..."
        placeholderTextColor="#94A3B8"
        value={value}
        onChangeText={onSearch}
        autoCapitalize="none"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
});

export default TransactionSearch; 