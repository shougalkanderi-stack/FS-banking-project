import { getTransactions, Transaction } from "@/api/transactions";
import TransactionItem from "@/components/TransactionItem";
import { useQuery } from "@tanstack/react-query";
import moment from 'moment';
import React, { useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Modal,
    RefreshControl,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import CalendarPicker from 'react-native-calendar-picker';

// Define transaction types for better type safety and readability
type TransactionType = 'transfer' | 'withdraw' | 'deposit' | 'all';

// Define calendar picker date type
type CalendarDate = {
  timestamp: number;
  date: Date;
  year: number;
  month: number;
  day: number;
};

const Transactions = () => {
  // Search and filter states
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [selectedType, setSelectedType] = useState<TransactionType>('all');
  const [showFromCalendar, setShowFromCalendar] = useState<boolean>(false);
  const [showToCalendar, setShowToCalendar] = useState<boolean>(false);

  // Fetch transactions
  const { 
    data: transactions, 
    isLoading, 
    refetch,
    isRefetching 
  } = useQuery<Transaction[]>({
    queryKey: ["transactions"],
    queryFn: () => getTransactions(),
  });

  // Loading state
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#38BDF8" />
        <Text style={styles.loadingText}>Loading your transactions...</Text>
      </View>
    );
  }

  // Helper function to validate date format (YYYY-MM-DD)
  const isValidDate = (dateString: string): boolean => {
    if (!dateString) return true; // Empty is valid
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime());
  };

  // Calendar handlers
  const handleFromDateSelect = (date: CalendarDate | null) => {
    if (date) {
      setFromDate(moment(date.date).format('YYYY-MM-DD'));
    }
    setShowFromCalendar(false);
  };

  const handleToDateSelect = (date: CalendarDate | null) => {
    if (date) {
      setToDate(moment(date.date).format('YYYY-MM-DD'));
    }
    setShowToCalendar(false);
  };

  // Filter transactions based on search criteria and type
  const filteredTransactions = transactions?.filter(transaction => {
    const transactionDate = new Date(transaction.createdAt);
    const transactionAmount = transaction.amount;
    const transactionType = transaction.type.toLowerCase();

    // Type filter
    if (selectedType !== 'all' && transactionType !== selectedType) {
      return false;
    }

    // Date range filter
    if (fromDate && isValidDate(fromDate)) {
      const from = new Date(fromDate);
      if (transactionDate < from) return false;
    }
    if (toDate && isValidDate(toDate)) {
      const to = new Date(toDate);
      if (transactionDate > to) return false;
    }

    // Amount filter
    if (amount) {
      const searchAmount = parseFloat(amount);
      if (!isNaN(searchAmount) && transactionAmount !== searchAmount) {
        return false;
      }
    }

    return true;
  });

  // Helper function to group transactions by date
  const groupTransactionsByDate = (transactions: Transaction[]) => {
    const groups: { [key: string]: Transaction[] } = {};
    
    transactions.forEach(transaction => {
      const date = new Date(transaction.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(transaction);
    });
    
    return groups;
  };

  const groupedTransactions = filteredTransactions ? groupTransactionsByDate(filteredTransactions) : {};

  // Render transaction group
  const renderTransactionGroup = ({ item }: { item: { date: string; data: Transaction[] } }) => (
    <View style={styles.transactionGroup}>
      <Text style={styles.dateHeader}>{item.date}</Text>
      {item.data.map((transaction) => (
        <TransactionItem key={transaction.id} transaction={transaction} />
      ))}
    </View>
  );

  // Transform grouped transactions for FlatList
  const sections = Object.entries(groupedTransactions).map(([date, data]) => ({
    date,
    data
  }));

  // Clear all filters
  const clearFilters = () => {
    setFromDate("");
    setToDate("");
    setAmount("");
    setSelectedType('all');
  };

  // Helper function to render type filter button
  const TypeFilterButton = ({ type, label }: { type: TransactionType; label: string }) => (
    <TouchableOpacity
      style={[
        styles.typeFilterButton,
        selectedType === type && styles.typeFilterButtonActive
      ]}
      onPress={() => setSelectedType(type)}
    >
      <Text
        style={[
          styles.typeFilterText,
          selectedType === type && styles.typeFilterTextActive
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  // Calendar Modal Component
  const CalendarModal = ({ 
    visible, 
    onClose, 
    onDateSelect, 
    selectedDate,
    minDate,
    maxDate,
  }: { 
    visible: boolean; 
    onClose: () => void; 
    onDateSelect: (date: CalendarDate | null) => void;
    selectedDate?: string;
    minDate?: Date;
    maxDate?: Date;
  }) => (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.calendarContainer}>
          <View style={styles.calendarHeader}>
            <Text style={styles.calendarTitle}>Select Date</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>
          <CalendarPicker
            onDateChange={onDateSelect}
            selectedStartDate={selectedDate}
            minDate={minDate}
            maxDate={maxDate}
            todayBackgroundColor="#38BDF8"
            selectedDayColor="#38BDF8"
            selectedDayTextColor="#FFFFFF"
            textStyle={{ color: '#FFFFFF' }}
            previousTitle="Previous"
            nextTitle="Next"
            previousTitleStyle={{ color: '#38BDF8' }}
            nextTitleStyle={{ color: '#38BDF8' }}
          />
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Transactions</Text>
        <Text style={styles.subtitle}>
          View your transaction history below
        </Text>
      </View>

      {/* Type Filter Section */}
      <View style={styles.typeFilterContainer}>
        <TypeFilterButton type="all" label="All" />
        <TypeFilterButton type="deposit" label="Deposits" />
        <TypeFilterButton type="withdraw" label="Withdrawals" />
        <TypeFilterButton type="transfer" label="Transfers" />
      </View>

      {/* Search Section */}
      <View style={styles.searchContainer}>
        <View style={styles.dateInputContainer}>
          <TouchableOpacity 
            style={[styles.input, styles.dateInput]} 
            onPress={() => setShowFromCalendar(true)}
          >
            <Text style={fromDate ? styles.dateText : styles.placeholderText}>
              {fromDate ? moment(fromDate).format('MMM DD, YYYY') : 'From Date'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.input, styles.dateInput]} 
            onPress={() => setShowToCalendar(true)}
          >
            <Text style={toDate ? styles.dateText : styles.placeholderText}>
              {toDate ? moment(toDate).format('MMM DD, YYYY') : 'To Date'}
            </Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Search by amount"
          placeholderTextColor="#94A3B8"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
        {(fromDate || toDate || amount || selectedType !== 'all') && (
          <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
            <Text style={styles.clearButtonText}>Clear All Filters</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
          <Text style={styles.legendText}>Deposits</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#EF4444' }]} />
          <Text style={styles.legendText}>Withdrawals & Transfers</Text>
        </View>
      </View>

      <FlatList
        data={sections}
        renderItem={renderTransactionGroup}
        keyExtractor={(item) => item.date}
        contentContainerStyle={styles.transactionsList}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor="#38BDF8"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No transactions found</Text>
            <Text style={styles.emptySubtext}>
              {fromDate || toDate || amount || selectedType !== 'all'
                ? "Try adjusting your search filters"
                : "Your transactions will appear here once you make them"}
            </Text>
          </View>
        }
      />

      {/* Calendar Modals */}
      <CalendarModal
        visible={showFromCalendar}
        onClose={() => setShowFromCalendar(false)}
        onDateSelect={handleFromDateSelect}
        selectedDate={fromDate}
        maxDate={toDate ? new Date(toDate) : undefined}
      />
      <CalendarModal
        visible={showToCalendar}
        onClose={() => setShowToCalendar(false)}
        onDateSelect={handleToDateSelect}
        selectedDate={toDate}
        minDate={fromDate ? new Date(fromDate) : undefined}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C4A6E',
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
  },
  typeFilterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingBottom: 16,
    gap: 8,
  },
  typeFilterButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  typeFilterButtonActive: {
    backgroundColor: '#38BDF8',
    borderColor: '#38BDF8',
  },
  typeFilterText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '500',
  },
  typeFilterTextActive: {
    color: '#FFFFFF',
  },
  searchContainer: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  dateInputContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  dateInput: {
    justifyContent: 'center',
  },
  dateText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  placeholderText: {
    color: '#94A3B8',
    fontSize: 14,
  },
  inputError: {
    borderColor: '#EF4444',
  },
  clearButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  clearButtonText: {
    color: '#38BDF8',
    fontSize: 14,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarContainer: {
    backgroundColor: '#0C4A6E',
    borderRadius: 16,
    padding: 16,
    width: '90%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  calendarTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    color: '#94A3B8',
    fontSize: 24,
    padding: 4,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#0C4A6E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 12,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  legendText: {
    color: '#94A3B8',
    fontSize: 14,
  },
  transactionsList: {
    padding: 24,
    paddingTop: 8,
  },
  transactionGroup: {
    marginBottom: 24,
  },
  dateHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94A3B8',
    marginBottom: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
  },
});

export default Transactions; 