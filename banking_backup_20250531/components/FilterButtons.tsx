import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type FilterType = 'all' | 'transfer' | 'deposit' | 'withdraw';

interface FilterButtonsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ activeFilter, onFilterChange }) => {
  const renderFilterButton = (type: FilterType, label: string) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        activeFilter === type && styles.filterButtonActive
      ]}
      onPress={() => onFilterChange(type)}
    >
      <Text style={[
        styles.filterButtonText,
        activeFilter === type && styles.filterButtonTextActive
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.filterContainer}>
      {renderFilterButton('all', 'All')}
      {renderFilterButton('deposit', 'Deposits')}
      {renderFilterButton('withdraw', 'Withdrawals')}
      {renderFilterButton('transfer', 'Transfers')}
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  filterButtonActive: {
    backgroundColor: '#38BDF8',
    borderColor: '#38BDF8',
  },
  filterButtonText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: '#FFFFFF',
  },
});

export default FilterButtons; 