import { depositMoney } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const deposit = () => {
  const [amount, setAmount] = useState(0);
  const { mutate } = useMutation({
    mutationKey: ["depositMoney"],
    mutationFn: () => depositMoney(amount),
  });
  const hamdleDeposit = async () => {};
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
          Deposit Funds
        </Text>
        <Text style={{ color: "black", fontSize: 16 }}>
          add funds to your current account
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
          placeholder="Enter Deposit Amount"
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
          onPress={hamdleDeposit}
        >
          <Text
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Deposit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default deposit;

const styles = StyleSheet.create({});
