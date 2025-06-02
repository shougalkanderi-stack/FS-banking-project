import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

/**
 * Props for the TransactionSearch component
 */
interface TransactionSearchProps {
  onSearch: (text: string) => void; // Function to call when search text changes
  value: string; // Current search text value
}

/**
 * TransactionSearch Component
 * A search input field for filtering transactions
 */
const TransactionSearch: React.FC<TransactionSearchProps> = ({
  onSearch,
  value = "", // Default to empty string if not provided
}) => {
  // Handle search input changes
  const handleSearchChange = (text: string) => {
    // Remove any special characters that might cause issues
    const sanitizedText = text.replace(/[^\w\s-]/gi, "");
    onSearch(sanitizedText);
  };

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search transactions..." // Placeholder text when empty
        placeholderTextColor="#94A3B8" // Light gray placeholder color
        value={value} // Current search text
        onChangeText={handleSearchChange} // Call handleSearchChange when text changes
        autoCapitalize="none" // Don't capitalize first letter
        autoCorrect={false} // Disable autocorrect
        clearButtonMode="while-editing" // Show clear button (iOS only)
      />
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  searchContainer: {
    marginBottom: 16, // Space below the search box
  },
  searchInput: {
    backgroundColor: "#74518722", // Semi-transparent white background
    borderRadius: 12, // Rounded corners
    padding: 16, // Inner spacing
    color: "#745187", // White text color
    fontSize: 16, // Text size
    borderWidth: 1, // Border width
    borderColor: "rgba(255, 255, 255, 0.1)", // Semi-transparent white border
  },
});

export default TransactionSearch;
