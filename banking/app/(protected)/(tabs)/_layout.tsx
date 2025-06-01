<<<<<<< HEAD
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
=======
// import { FontAwesomeIcon } from "@fortawesome/fontawesome-svg-core";
import FontAwesome from "@expo/vector-icons/FontAwesome";
>>>>>>> afcae267917f75207d4e631fb60d99b6294ebfff
import { Tabs } from "expo-router";
import React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

const tabsLayout = () => {
  return (
<<<<<<< HEAD
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: "#38BDF8",
        tabBarInactiveTintColor: "#94A3B8",
        tabBarLabelStyle: styles.tabLabel,
        tabBarItemStyle: styles.tabItem,
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: true,
      }}
    >
=======
    <Tabs screenOptions={{ tabBarActiveTintColor: "grey", headerShown: false }}>
>>>>>>> afcae267917f75207d4e631fb60d99b6294ebfff
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
<<<<<<< HEAD
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" size={22} color={color} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="(payments)"
        options={{
          title: "Payments",
          tabBarButton: (props) => (
            <Pressable
              onPress={props.onPress}
              style={({ pressed }) => [
                styles.paymentButtonContainer,
                {
                  transform: [{ scale: pressed ? 0.95 : 1 }],
                  opacity: pressed ? 0.9 : 1,
                },
              ]}
            >
              <View style={styles.paymentButtonOuter}>
                <View style={styles.paymentButtonInner}>
                  <FontAwesome5
                    name="money-check-alt"
                    size={24}
                    color="#FFFFFF"
                    style={styles.paymentIcon}
                  />
                </View>
              </View>
              <Text
                style={[
                  styles.tabLabel,
                  {
                    color: props.accessibilityState?.selected
                      ? "#38BDF8"
                      : "#94A3B8",
                    marginTop: 8,
                  },
                ]}
              >
                Payments
              </Text>
            </Pressable>
          ),
        }}
      /> */}
=======
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
>>>>>>> afcae267917f75207d4e631fb60d99b6294ebfff
      <Tabs.Screen
        name="(services)"
        options={{
          title: "Services",
<<<<<<< HEAD

          tabBarButton: (props) => (
            <Pressable
              onPress={props.onPress}
              style={({ pressed }) => [
                styles.serviceButtonContainer,
                {
                  transform: [{ scale: pressed ? 0.95 : 1 }],
                  opacity: pressed ? 0.9 : 1,
                },
              ]}
            >
              <View style={styles.servicesButtonOuter}>
                <View style={styles.servicesButtonInner}>
                  <FontAwesome5
                    name="room-service"
                    size={24}
                    color="#FFFFFF"
                    style={styles.serviceIcon}
                  />
                </View>
              </View>
              <Text
                style={[
                  styles.tabLabel,
                  {
                    color: props.accessibilityState?.selected
                      ? "#38BDF8"
                      : "#94A3B8",
                    marginTop: 8,
                  },
                ]}
              >
                Services
              </Text>
            </Pressable>
=======
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
>>>>>>> afcae267917f75207d4e631fb60d99b6294ebfff
          ),
        }}
      />
      <Tabs.Screen
        name="(network)"
        options={{
          title: "Network",
<<<<<<< HEAD
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="network-wired" size={22} color={color} />
=======
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="user" color={color} />
>>>>>>> afcae267917f75207d4e631fb60d99b6294ebfff
          ),
        }}
      />
    </Tabs>
  );
};

export default tabsLayout;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#0C4A6E",
    borderTopColor: "rgba(255, 255, 255, 0.1)",
    borderTopWidth: 1,
    paddingTop: 10,
    paddingBottom: Platform.OS === "ios" ? 25 : 10,
    height: Platform.OS === "ios" ? 85 : 65,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4,
  },
  tabItem: {
    paddingVertical: 4,
  },
  serviceButtonContainer: {
    top: -20,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  servicesButtonOuter: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: "rgba(56, 189, 248, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#38BDF8",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  servicesButtonInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#38BDF8",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#0C4A6E",
  },
  serviceIcon: {
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  paymentButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  paymentButtonOuter: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(56, 189, 248, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#38BDF8",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  paymentButtonInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#38BDF8",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#0C4A6E",
  },
  paymentIcon: {
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
});
