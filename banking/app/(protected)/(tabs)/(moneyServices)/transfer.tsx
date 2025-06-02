import { getAllUsers, transferMoney } from "@/api/auth";
import userInfo from "@/types/UserInfo";
import { Picker } from "@react-native-picker/picker";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Transfer = (user: userInfo) => {
  // steps to understand:
  // i need to grap the current user
  // i need to grap all users and make a selection which user i want to transfer the funds to
  //useMutate to update the balance of both the current user and the selected user
  // the api should update the selected user balance, I need to upadate the current user pragmatically
  //how can I make the user selection?
  // can I use two useQ? two useM?

  // grap the current user
  const { transfer } = useLocalSearchParams();
  // console.log("transfer param:", transfer);
  // grap all users
  const { data, isLoading } = useQuery({
    queryKey: ["getUser"],
    queryFn: async () => await getAllUsers(),
  });

  if (isLoading) {
    return <Text>Loading users...</Text>;
  }

  const usersArray = Array.isArray(data)
    ? data
    : Array.isArray(data?.users)
    ? data.users
    : [];

  // usersArray.forEach((user: any) => console.log("User ID:", user._id));

  // const selectedUser = usersArray.find(
  //   (user: any) => String(user._id) === String(transfer)
  // );

  const [amount, setAmount] = useState(0);
  // const { data, isLoading } = useQuery({
  //   queryKey: ["getUser"],
  //   queryFn: async () => await currentUser(),
  // });

  //
  const { mutate, isError, isSuccess } = useMutation({
    mutationKey: ["transferMoney"],
    mutationFn: async () => {
      await transferMoney(amount, usersArray[0].username);
    },
  });
  if (isSuccess) {
    alert("Transfer successful!");
  }
  if (isError) {
    alert("Transfer failed. Please try again.");
  }
  const hamdleTransfer = async () => {
    mutate();
  };
  const [selectedUserId, setSelectedUserId] = useState<string | userInfo>("0");
  // console.log(data);
  const items = usersArray?.map((user: any) => ({
    label: user.username,
    value: user._id,
  }));
  console.log("Droselecteduser", selectedUserId);

  return (
    <View>
      <Text style={styles.label}>Select recipient:</Text>
      {/* <RNPickerSelect
        onValueChange={(value: userInfo) => setSelectedUserId(value)}
        placeholder={{ label: "Select a user...", value: null }}
        items={items}
        style={pickerSelectStyles}
      /> */}
      <Picker
        selectedValue={selectedUserId}
        onValueChange={(itemValue) => setSelectedUserId(itemValue)}
        style={{ height: 50, width: "100%" }}
      >
        {usersArray.map((user: any) => (
          <Picker.Item key={user._id} label={user.username} value={user.id} />
        ))}
      </Picker>

      <View
        style={{
          width: "100%",
          padding: 20,
          marginTop: 100,
        }}
      >
        <Text
          style={{
            color: "black",
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          Transfer Funds
        </Text>
        <Text style={{ color: "black", fontSize: 16 }}>
          Transfer funds from your current account to another account
        </Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <TextInput
          style={{
            backgroundColor: "white",
            padding: 10,
            borderRadius: 5,
            marginTop: 20,
            width: "90%",
          }}
          placeholderTextColor={"black"}
          placeholder="Enter Transfer Amount"
          onChangeText={(text) => setAmount(Number(text))}
        />
        <Text
          style={{
            color: "black",
            fontSize: 16,
            marginTop: 10,
          }}
        ></Text>
        <TouchableOpacity
          style={{
            backgroundColor: "white",
            padding: 10,
            borderRadius: 5,
            marginTop: 20,
            alignItems: "center",
            width: "90%",
          }}
          onPress={hamdleTransfer}
        >
          <Text
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Transfer
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Transfer;

const styles = StyleSheet.create({
  picker: {
    height: 50,
    color: "black", // This sets the text color
    borderWidth: 1,
    borderColor: "black",
  },
  container: { padding: 16 },
  label: { marginTop: 16, marginBottom: 8, fontWeight: "bold" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
  },
});
const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    marginBottom: 20,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    marginBottom: 20,
  },
};
