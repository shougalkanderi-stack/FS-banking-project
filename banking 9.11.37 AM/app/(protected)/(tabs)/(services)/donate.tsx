import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const charities = [
  { id: "1", name: "Help Gaza" },
  { id: "2", name: "UNICEF" },
  { id: "3", name: "Doctors Without Borders" },
  { id: "4", name: "World Wildlife Fund" },
  { id: "5", name: "Charity: Water" },
];

const Donate = () => {
  const [donationAmount, setDonationAmount] = useState(0);
  const [selectedCharityId, setSelectedCharityId] = useState<string>("");

  const handleDonate = () => {
    if (!selectedCharityId || donationAmount <= 0) {
      Alert.alert("Error", "Please select a charity and enter a valid amount.");
      return;
    }

    const selectedCharity = charities.find((c) => c.id === selectedCharityId);
    Alert.alert(
      "Donation Successful",
      `You donated $${donationAmount} to ${selectedCharity?.name}`
    );

    // Reset form
    setDonationAmount(0);
    setSelectedCharityId("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Make a Donation</Text>
      <Text style={styles.subheading}>
        Choose a charity and enter the amount you'd like to donate.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter donation amount"
        placeholderTextColor="gray"
        keyboardType="numeric"
        value={donationAmount ? donationAmount.toString() : ""}
        onChangeText={(text) => setDonationAmount(Number(text))}
      />

      <Text style={styles.label}>Select a charity:</Text>
      <Picker
        selectedValue={selectedCharityId}
        onValueChange={(value) => setSelectedCharityId(value)}
        style={styles.picker}
      >
        <Picker.Item label="-- Choose a charity --" value="" />
        {charities.map((charity) => (
          <Picker.Item
            key={charity.id}
            label={charity.name}
            value={charity.id}
          />
        ))}
      </Picker>

      <TouchableOpacity style={styles.button} onPress={handleDonate}>
        <Text style={styles.buttonText}>Donate</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Donate;

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 10,
  },
  subheading: { fontSize: 16, marginBottom: 20 },
  label: {
    fontWeight: "bold",
    marginTop: 60,
    marginBottom: 10,
  },
  input: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    color: "black",
    marginTop: 30,
  },
  picker: {
    height: 50,
    backgroundColor: "white",
    color: "black",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginTop: 50,
  },
  button: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    marginTop: 170,
    alignItems: "center",
  },
  buttonText: { color: "black", fontWeight: "bold", fontSize: 16 },
});
