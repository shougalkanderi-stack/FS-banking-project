import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const networkLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="network" options={{ title: "Network" }} />
      <Stack.Screen name="[transfer]" options={{ title: "Transfer Funds" }} />
    </Stack>
  );
};

export default networkLayout;

const styles = StyleSheet.create({});
