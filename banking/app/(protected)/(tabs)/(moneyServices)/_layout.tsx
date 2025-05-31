import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const MSlayout = () => {
  return (
    <Stack>
      <Stack.Screen name="depositt" options={{ title: "Deposit Funds" }} />
    </Stack>
  );
};

export default MSlayout;

const styles = StyleSheet.create({});
