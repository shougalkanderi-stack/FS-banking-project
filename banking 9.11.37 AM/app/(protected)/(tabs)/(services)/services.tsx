import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const services = [
  // {
  //   id: "1",
  //   title: "Transfer Money",
  //   icon: "exchange-alt",
  //   color: "#745187",
  // },
  // {
  //   id: "2",
  //   title: "Bill Payment",
  //   icon: "file-invoice-dollar",
  //   color: "#745187",
  // },
  {
    id: "3",
    title: "Pay You",
    icon: "hand-holding-usd",
    color: "#745187",
  },
  {
    id: "4",
    title: "Pay Me",
    icon: "hand-holding",
    color: "#745187",
  },
  {
    id: "5",
    title: "Donate",
    icon: "hand-holding-heart",
    color: "#745187",
  },
  {
    id: "6",
    title: " Withdraw",
    icon: "money-bill-wave",
    color: "#745187",
  },
];

const Services = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Services</Text>
        <Text style={styles.subtitle}>Choose from our available services</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.servicesGrid}>
          {services.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={styles.serviceCard}
              onPress={() => {
                if (service.id === "4") {
                  router.push("/depositt");
                }
                if (service.id === "6") {
                  router.push("/(protected)/(tabs)/(services)/withdraw");
                }
                if (service.id === "3") {
                  router.push("/(protected)/(tabs)/(services)/transfer");
                }
                if (service.id === "5") {
                  router.push("/(protected)/(tabs)/(services)/donate");
                }
              }}
            >
              <View style={styles.iconContainer}>
                <FontAwesome5
                  name={service.icon}
                  size={24}
                  color={service.color}
                />
              </View>
              <Text style={styles.serviceTitle}>{service.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0dcf577",
  },
  header: {
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#745187",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#94A3B8",
  },
  scrollView: {
    flex: 1,
  },
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 16,
    gap: 16,
  },
  serviceCard: {
    width: "47%",
    backgroundColor: "#74518744",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  iconContainer: {
    width: 60,
    height: 60,
    backgroundColor: "#fff7fc",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#745187",
    textAlign: "center",
  },
});

export default Services;
