import { getTransactions, Transaction } from "@/api/transactions";
import BalanceCard from "@/components/BalanceCard";
import FilterButtons, { FilterType } from "@/components/FilterButtons";
import TransactionItem from "@/components/TransactionItems";
import UserProfile from "@/components/UserProfile";
import AuthContext from "@/conext/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";

const Home = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { setIsAuth } = useContext(AuthContext);

  // States
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  // const [searchText, setSearchText] = useState("");
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [selectingStartDate, setSelectingStartDate] = useState(true);

  // Fetch transactions
  const {
    data: transactions = [],
    isLoading,
    refetch,
    isRefetching,
  } = useQuery<Transaction[]>({
    queryKey: ["transactions"],
    queryFn: () => getTransactions(),
  });

  // Set initial filter from URL
  useEffect(() => {
    if (typeof params.filter === "string") {
      setActiveFilter(params.filter as FilterType);
    }
  }, [params.filter]);

  // Helper function to format date for search
  const getSearchableDateFormats = (date: Date) => {
    return [
      date.toLocaleDateString(),
      `${date.getMonth() + 1}/${date.getDate()}`,
      date.toLocaleDateString("en-US", { month: "long" }).toLowerCase(),
      date.toLocaleDateString("en-US", { month: "short" }).toLowerCase(),
    ];
  };

  // Filter transactions
  const filteredTransactions = transactions.filter(
    (transaction: Transaction) => {
      // Type filter
      if (activeFilter !== "all" && transaction.type !== activeFilter) {
        return false;
      }

      // Date range filter
      if (startDate && endDate) {
        const transactionDate = new Date(transaction.createdAt)
          .toISOString()
          .split("T")[0];
        if (transactionDate < startDate || transactionDate > endDate) {
          return false;
        }
      }

      // Search filter
      // if (searchText) {
      //   const searchLower = searchText.toLowerCase();
      //   const transactionDate = new Date(transaction.createdAt);

      //   // Create array of searchable values
      //   const searchableValues = [
      //     transaction.type.toLowerCase(),
      //     transaction.amount || "any",
      //     ...getSearchableDateFormats(transactionDate),
      //   ];

      //   // Return true if any value matches the search text
      //   return searchableValues.some((value) => value.toString);
      // }

      return true;
    }
  );

  // Handlers
  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
    router.setParams({ filter });
  };

  const handleDateSelect = (day: { dateString: string }) => {
    const selectedDate = day.dateString;

    if (selectingStartDate) {
      setStartDate(selectedDate);
      setSelectingStartDate(false);
    } else {
      if (selectedDate < startDate!) {
        setStartDate(selectedDate);
        setEndDate(startDate);
      } else {
        setEndDate(selectedDate);
      }
      setShowStartDatePicker(false);
      setShowEndDatePicker(false);
    }
  };

  const clearDateRange = () => {
    setStartDate(null);
    setEndDate(null);
    setSelectingStartDate(true);
  };

  // Loading state
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#a8d5e2" />
      </View>
    );
  }

  // Helper function to create calendar marked dates
  const getMarkedDates = () => {
    return transactions.reduce(
      (acc: Record<string, any>, transaction: Transaction) => {
        const date = new Date(transaction.createdAt)
          .toISOString()
          .split("T")[0];
        acc[date] = {
          marked: true,
          dotColor: "#a8d5e2",
          ...(startDate &&
            date === startDate && {
              selected: true,
              startingDay: true,
              color: "a8d5e2",
            }),
          ...(endDate &&
            date === endDate && {
              selected: true,
              endingDay: true,
              color: "#a8d5e2",
            }),
          ...(startDate &&
            endDate &&
            date > startDate &&
            date < endDate && { selected: true, color: "#a8d5e2" }),
        };
        return acc;
      },
      {}
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.push("/(protected)/(tabs)/(home)/profile")}
          style={styles.profileButton}
        >
          <UserProfile />
        </TouchableOpacity>
      </View>

      <View style={styles.transactionsContainer}>
        {transactions.length > 0 && <BalanceCard transactions={transactions} />}

        <Text style={styles.sectionTitle}>Recent Transactions</Text>

        {/* <TransactionSearch value={searchText} onSearch={setSearchText} /> */}

        <View style={styles.dateRangeContainer}>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowStartDatePicker(true)}
          >
            <Text style={styles.dateButtonLabel}>Start Date</Text>
            <Text style={styles.dateButtonText}>
              {startDate ? new Date(startDate).toLocaleDateString() : "Select"}
            </Text>
          </TouchableOpacity>

          <Text style={styles.dateRangeSeparator}>to</Text>

          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowEndDatePicker(true)}
          >
            <Text style={styles.dateButtonLabel}>End Date</Text>
            <Text style={styles.dateButtonText}>
              {endDate ? new Date(endDate).toLocaleDateString() : "Select"}
            </Text>
          </TouchableOpacity>

          {(startDate || endDate) && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={clearDateRange}
            >
              <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
          )}
        </View>

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
              tintColor="#745187"
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No transactions found</Text>
            </View>
          }
        />

        {/* Date Picker Modals */}
        <Modal
          visible={showStartDatePicker}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Start Date</Text>
              <Calendar
                markingType="period"
                markedDates={getMarkedDates()}
                onDayPress={handleDateSelect}
                theme={{
                  calendarBackground: "#FFFFFF",
                  textSectionTitleColor: "#1E293B",
                  selectedDayBackgroundColor: "#745187",
                  selectedDayTextColor: "#745187",
                  todayTextColor: "#745187",
                  dayTextColor: "#1E293B",
                  textDisabledColor: "#94A3B8",
                  dotColor: "#745187",
                  monthTextColor: "#1E293B",
                  textMonthFontWeight: "bold",
                }}
              />
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setShowStartDatePicker(false)}
              >
                <Text style={styles.modalCloseButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          visible={showEndDatePicker}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select End Date</Text>
              <Calendar
                markingType="period"
                markedDates={getMarkedDates()}
                minDate={startDate || undefined}
                onDayPress={handleDateSelect}
                theme={{
                  calendarBackground: "#FFFFFF",
                  textSectionTitleColor: "#1E293B",
                  selectedDayBackgroundColor: "#745187",
                  selectedDayTextColor: "#745187",
                  todayTextColor: "#745187",
                  dayTextColor: "#1E293B",
                  textDisabledColor: "#94A3B8",
                  dotColor: "#745187",
                  monthTextColor: "#1E293B",
                  textMonthFontWeight: "bold",
                }}
              />
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setShowEndDatePicker(false)}
              >
                <Text style={styles.modalCloseButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0dcf577",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  profileButton: {
    borderRadius: 35,
    overflow: "hidden",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  transactionsContainer: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#745187",
    marginBottom: 30,
  },
  transactionsList: {
    paddingBottom: 24,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 24,
  },
  emptyText: {
    color: "#94A3B8",
    fontSize: 16,
  },
  dateRangeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  dateButton: {
    flex: 1,
    backgroundColor: "#74518722",
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  dateButtonLabel: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 4,
  },
  dateButtonText: {
    fontSize: 14,
    color: "#1E293B",
    fontWeight: "500",
  },
  dateRangeSeparator: {
    marginHorizontal: 8,
    color: "#745187",
    fontSize: 14,
  },
  clearButton: {
    marginLeft: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#EF4444",
  },
  clearButtonText: {
    color: "#745187",
    fontSize: 12,
    fontWeight: "500",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#74518722",
    margin: 20,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 16,
    textAlign: "center",
  },
  modalCloseButton: {
    backgroundColor: "#EF4444",
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  modalCloseButtonText: {
    color: "#745187",
    textAlign: "center",
    fontWeight: "600",
  },
});

export default Home;
