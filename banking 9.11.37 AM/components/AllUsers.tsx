import userInfo from "@/types/UserInfo";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const AllUsers = (user: userInfo) => {
  return (
    <View style={{ display: "flex", alignItems: "center" }}>
      <View
        style={{
          height: 100,
          width: "95%",
          backgroundColor: "#74518744",
          padding: 10,
          marginTop: 15,
          borderRadius: 15,
          flexDirection: "row",
          alignItems: "center",
          borderColor: "grey",
        }}
      >
        <Image
          source={require("@/assets/images/noAvatar.png")}
          style={{
            height: 80,
            width: 80,
            borderRadius: 40,
            padding: 5,
            borderColor: "grey",
          }}
        />
        <Text
          style={{
            padding: 10,
            fontSize: 20,
            fontWeight: "bold",
            color: "#0f4c5c",
          }}
        >
          {user.username}
        </Text>
      </View>
    </View>
  );
};

export default AllUsers;

const styles = StyleSheet.create({});
