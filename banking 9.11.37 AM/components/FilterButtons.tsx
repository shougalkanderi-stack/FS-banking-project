import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type FilterType = "all" | "transfer" | "deposit" | "withdraw";

interface FilterButtonsProps {
  activeFilter: FilterType;
  onFilterChange: (type: FilterType) => void;
}

/**
 * FilterButtons Component
 * Displays a row of buttons to filter transactions by type
 *
 * @param activeFilter - Currently selected filter
 * @param onFilterChange - Function to call when filter changes
 */
const FilterButtons: React.FC<FilterButtonsProps> = ({
  activeFilter,
  onFilterChange,
}) => {
  /**
   * Helper function to render a single filter button
   * @param type - The filter type for this button
   * @param label - The text to display on the button
   */
  const renderFilterButton = (type: FilterType, label: string) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        activeFilter === type && styles.filterButtonActive,
      ]}
      onPress={() => onFilterChange(type)}
    >
      <Text
        style={[
          styles.filterButtonText,
          activeFilter === type && styles.filterButtonTextActive,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.filterContainer}>
      {renderFilterButton("all", "All")}
      {renderFilterButton("deposit", "Deposits")}
      {renderFilterButton("withdraw", "Withdrawals")}
      {renderFilterButton("transfer", "Transfers")}
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  filterButtonActive: {
    backgroundColor: "rgb(140, 199, 238)",
  },
  filterButtonText: {
    color: "#94A3B8",
    fontSize: 14,
    fontWeight: "500",
  },
  filterButtonTextActive: {
    color: "#FFFFFF",
  },
});

export default FilterButtons;
