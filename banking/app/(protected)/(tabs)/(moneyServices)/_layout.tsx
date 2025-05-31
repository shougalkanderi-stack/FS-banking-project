import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const MSlayout = () => {
  return (
    <Stack>
      <Stack.Screen name="depositt" options={{ title: "Deposit Funds" }} />
      <Stack.Screen name="withdraw" options={{ title: "Withdraw Funds" }} />
      <Stack.Screen name="transfer" options={{ title: "Transfer Funds" }} />
    </Stack>
  );
};

export default MSlayout;

const styles = StyleSheet.create({});
