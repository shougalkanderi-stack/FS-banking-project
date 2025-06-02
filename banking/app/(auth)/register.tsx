import React, { useContext, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
//   import colors from "../../data/styling/colors";
import { registerUser } from "@/api/auth";
import { deleteToken } from "@/api/storage";
import AuthContext from "@/conext/AuthContext";
import { useMutation } from "@tanstack/react-query";
import * as imagePicker from "expo-image-picker";
import { useRouter } from "expo-router";

const register = () => {
  const [image, setImage] = useState(
    "https://i.pinimg.com/236x/cf/72/55/cf7255ae7344ce44e62f784fe160ca0d.jpg"
  );
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuth } = useContext(AuthContext);
  const router = useRouter();
  //   const userObj: userInfo = {
  //     username: userName,
  //     password: password,
  //     image: image,
  //   };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await imagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const { mutate } = useMutation({
    mutationKey: ["register"],
    mutationFn: () => registerUser({ username, password, image }),
    onSuccess: () => {
      setIsAuth(true);
      router.replace("/");
    },
    onError: (Error) => {
      console.log(Error);
    },
  });

  const handleRegister = () => mutate();
  const LogOut = async () => deleteToken();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "grey",
          padding: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "#eacdc2",
            height: 150,
            width: 150,
            borderRadius: 50,
          }}
        >
          {image && (
            <Image
              source={{ uri: image }}
              style={{
                height: 150,
                width: 150,
                borderRadius: 50,
                justifyContent: "center",
              }}
            />
          )}
        </View>

        <TouchableOpacity
          style={{ marginTop: 20 }}
          onPress={() => {
            pickImage();
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>
            Upload Profile Image
          </Text>
        </TouchableOpacity>
        <View style={{ width: "100%", padding: 20 }}>
          <Text
            style={{
              color: "white",
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            Register
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
            onPress={handleRegister}
          >
            <Text
              style={{
                color: "#111827",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Register
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginTop: 20, alignItems: "center" }}
            onPress={() => router.push("/(auth)/login")}
          >
            <Text style={{ color: "white", fontSize: 16 }}>
              Already have an account?{" "}
              <Text style={{ color: "white", fontWeight: "bold" }}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
export default register;

const styles = StyleSheet.create({});

// const Register = () => {
