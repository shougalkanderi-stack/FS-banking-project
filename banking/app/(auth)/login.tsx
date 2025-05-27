import { Login } from "@/api/auth";
import AuthContext from "@/conext/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuth } = useContext(AuthContext);
  const router = useRouter();
  const { mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: async () => Login(username, password),
    onSuccess: () => {
      setIsAuth(true);
      router.replace("/home");
    },
    onError: (Error) => {
      console.log(Error);
    },
  });
  const handleLogin = () => {
    mutate();
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "grey",
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ width: "100%", padding: 20 }}>
        <Text
          style={{
            color: "Black",
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          Login
        </Text>
        <Text style={{ color: "white", fontSize: 16 }}>
          Create your account
        </Text>

        <TextInput
          style={{
            backgroundColor: "white",
            padding: 10,
            borderRadius: 5,
            marginTop: 20,
          }}
          placeholder="Name"
          onChangeText={(text) => setUserName(text.toLowerCase())}
        />

        <TextInput
          style={{
            backgroundColor: "white",
            padding: 10,
            borderRadius: 5,
            marginTop: 20,
          }}
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={(text) => setPassword(text.toLowerCase())}
        />

        <TouchableOpacity
          style={{
            backgroundColor: "white",
            padding: 10,
            borderRadius: 5,
            marginTop: 20,
            alignItems: "center",
          }}
          onPress={handleLogin}
        >
          <Text
            style={{
              color: "#111827",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Login
          </Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={{ marginTop: 20, alignItems: "center" }}
          onPress={() => router.push("/(auth)/register")}
        >
          <Text style={{ color: "white", fontSize: 16 }}>
            Don't already have an account?{" "}
            <Text style={{ color: "white", fontWeight: "bold" }}>Register</Text>
          </Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default login;

const styles = StyleSheet.create({});
