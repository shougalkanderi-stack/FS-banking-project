import { deleteToken } from "@/api/storage";
import AuthContext from "@/conext/AuthContext";
import { profileStyles } from "@/src/screens/ProfileScreenStyle";
import React, { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const profile = () => {
  const LogOut = async () => {
    deleteToken();
    setIsAuth(false);
  };
  const { setIsAuth } = useContext(AuthContext);

  return (
    <View>
      <Text style={profileStyles.name}></Text>

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
    </View>
  );
};

export default profile;
