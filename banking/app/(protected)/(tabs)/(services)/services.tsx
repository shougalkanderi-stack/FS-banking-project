import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const services = () => {
  const router = useRouter();
  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: "center" }}>
        <TouchableOpacity
          onPress={() =>
            router.push("/(protected)/(tabs)/(moneyServices)/depositt")
          }
        >
          <View
            style={{
              height: 250,
              width: 250,
              backgroundColor: "lightgrey",
              borderRadius: 25,
              borderColor: "grey",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Image
              source={require("@/assets/images/deposit.png")}
              style={{ width: 150, height: 150 }}
            />
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Deposit Funds
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            height: 250,
            width: 250,
            backgroundColor: "lightgrey",
            borderRadius: 25,
            borderColor: "grey",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Image
            source={require("@/assets/images/cash-withdrawal.png")}
            style={{ width: 150, height: 150 }}
          />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Withdraw Funds
          </Text>
        </View>
        <View
          style={{
            height: 250,
            width: 250,
            backgroundColor: "lightgrey",
            borderRadius: 25,
            borderColor: "grey",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Image
            source={require("@/assets/images/money-transfer.png")}
            style={{ width: 150, height: 150 }}
          />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Transfer Funds
          </Text>
        </View>
        {/* <Text>Services tab</Text> */}
      </View>
    </ScrollView>
  );
};

export default services;

const styles = StyleSheet.create({});
