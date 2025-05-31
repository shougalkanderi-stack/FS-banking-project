// import { FontAwesomeIcon } from "@fortawesome/fontawesome-svg-core";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const tabsLayout = () => {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "grey", headerShown: false }}>
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(services)"
        options={{
          title: "Services",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="money" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(network)"
        options={{
          title: "Network",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="user" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(moneyServices)"
        options={{
          title: "Money Services",
          href: null, // hide the tab
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="user" color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default tabsLayout;

const styles = StyleSheet.create({});
