import { getTransactions, Transaction } from "@/api/transactions";
import BalanceCard from "@/components/BalanceCard";
import FilterButtons, { FilterType } from "@/components/FilterButtons";
import TransactionItem from "@/components/TransactionItem";
import TransactionSearch from "@/components/TransactionSearch";
import UserProfile from "@/components/UserProfile";
import AuthContext from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const Home = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { setIsAuth } = useContext(AuthContext);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [searchText, setSearchText] = useState('');

  // Set initial filter from URL params if available
  useEffect(() => {
    if (params.filter && typeof params.filter === 'string') {
      setActiveFilter(params.filter as FilterType);
    }
  }, [params.filter]);

  // Query hook for fetching transactions
  const { data: transactions, isLoading, refetch, isRefetching } = useQuery<Transaction[]>({
    queryKey: ['transactions'],
    queryFn: () => getTransactions(),
  });

  // Handle filter changes
  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
    router.setParams({ filter });
  };

  // Handle search text change
  const onSearchChange = (text: string) => {
    setSearchText(text);
  };

  // Navigate to profile
  const handleProfilePress = () => {
    router.push("/(protected)/(tabs)/(home)/profile");
  };

  // Filter transactions based on type and search
  const filteredTransactions = transactions?.filter((transaction: Transaction) => {
    // Apply type filter
    if (activeFilter !== 'all' && transaction.type !== activeFilter) {
      return false;
    }

    // Apply search filter if search text exists
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      const amountString = transaction.amount.toString();
      const dateString = new Date(transaction.createdAt).toLocaleDateString();
      
      return (
        transaction.type.toLowerCase().includes(searchLower) ||
        amountString.includes(searchLower) ||
        dateString.toLowerCase().includes(searchLower)
      );
    }

    return true;
  });

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#38BDF8" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleProfilePress} style={styles.profileButton}>
          <UserProfile />
        </TouchableOpacity>
      </View>
      <View style={styles.transactionsContainer}>
        {transactions && <BalanceCard transactions={transactions} />}
        
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        
        <TransactionSearch 
          value={searchText}
          onSearch={onSearchChange}
        />

        <FilterButtons 
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />

        <FlatList
          data={filteredTransactions}
          renderItem={({ item }) => <TransactionItem transaction={item} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.transactionsList}
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
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C4A6E',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  profileButton: {
    borderRadius: 35,
    overflow: 'hidden',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0C4A6E',
  },
  transactionsContainer: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  transactionsList: {
    paddingBottom: 24,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  emptyText: {
    color: '#94A3B8',
    fontSize: 16,
  },
});

export default Home;
