import { currentUser, withdrawMoney } from "@/api/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const withdraw = () => {
  const [amount, setAmount] = useState(0);
  const { data, isLoading } = useQuery({
    queryKey: ["getUser"],
    queryFn: async () => await currentUser(),
  });
  const { mutate, isError, isSuccess } = useMutation({
    mutationKey: ["withdrawMoney"],
    mutationFn: async () => {
      const newBlance = data?.balance - amount;
      await withdrawMoney(newBlance);
    },
  });
  if (isSuccess) {
    console.log("success");
  }
  if (isError) {
    console.log("fail");
  }
  const hamdleWithdraw = async () => {
    if (amount > 1) {
      mutate();
    } else if (amount <= 1 && amount > 0) {
      alert("Can Not Withdraw Amount Less Than 1KD");
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
          Withdraw Funds
        </Text>
        <Text style={{ color: "black", fontSize: 16 }}>
          withdraw funds from your current account
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
          onPress={hamdleWithdraw}
        >
          <Text
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Withdraw
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default withdraw;

const styles = StyleSheet.create({});
