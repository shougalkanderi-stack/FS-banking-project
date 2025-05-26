import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const tabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="(home)" options={{ title: "Home" }} />
      <Tabs.Screen name="(service)" options={{ title: "Services" }} />
      <Tabs.Screen name="(network)" options={{ title: "Network" }} />
    </Tabs>
  );
};

export default tabsLayout;

const styles = StyleSheet.create({});
