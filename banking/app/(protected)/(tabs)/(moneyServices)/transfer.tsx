import { currentUser, transferMoney } from "@/api/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const transfer = () => {
  const [amount, setAmount] = useState(0);
  const { data, isLoading } = useQuery({
    queryKey: ["getUser"],
    queryFn: async () => await currentUser(),
  });
  const { mutate, isError, isSuccess } = useMutation({
    mutationKey: ["transferMoney"],
    mutationFn: async () => {
      const newBlance = data?.balance - amount;
      await transferMoney(newBlance, data.username);
    },
  });
  if (isSuccess) {
    console.log("success");
  }
  if (isError) {
    console.log("fail");
  }
  const hamdleTransfer = async () => {
    if (amount > data?.balance) {
      mutate();
    } else if (amount <= 1 && amount > 0) {
      alert("Can Not Transfer Amount Less Than or Equal To 1KD");
    } else {
      alert("Please Enter a Valid Number");
    }
  };

  console.log(data);
  return (
    <View>
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
          placeholder="Enter Withdraw Amount"
          onChangeText={(text) => setAmount(Number(text))}
        />
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

export default transfer;

const styles = StyleSheet.create({});
