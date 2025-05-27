import { deleteToken } from "@/api/storage";
import AuthContext from "@/conext/AuthContext";
import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const homeLayout = () => {
  const LogOut = async () => {
    deleteToken();
    setIsAuth(false);
  };
  const { setIsAuth } = useContext(AuthContext);

  return (
    <View>
      <TouchableOpacity
        style={{
          backgroundColor: "white",
          padding: 10,
          borderRadius: 5,
          marginTop: 20,
          alignItems: "center",
        }}
        onPress={LogOut}
      >
        <Text
          style={{
            color: "#111827",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          LogOut
        </Text>
      </TouchableOpacity>
      <Text>homelayout</Text>
    </View>
  );
};

export default homeLayout;

const styles = StyleSheet.create({});
