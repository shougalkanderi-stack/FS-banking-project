import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const servicesLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="services" options={{ title: "Services" }} />
    </Stack>
  );
};

const styles = StyleSheet.create({});

export default servicesLayout;
