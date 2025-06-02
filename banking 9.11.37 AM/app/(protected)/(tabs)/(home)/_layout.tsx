import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const homeLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" />
      <Stack.Screen
        name="profile"
        options={{
          presentation: "modal",
          animation: "slide_from_bottom",
        }}
      />
    </Stack>
  );
};

export default homeLayout;

const styles = StyleSheet.create({});
