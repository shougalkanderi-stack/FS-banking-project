import { Login as LoginAPI } from "@/api/auth";
import AuthContext from "@/conext/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuth } = useContext(AuthContext);
  const router = useRouter();
  const { mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: async () => LoginAPI(username, password),
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar style="light" />
      <View style={styles.overlay}>
        <View style={styles.formContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>Sign in to access your account</Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#A0AEC0"
              onChangeText={(text) => setUserName(text.toLowerCase())}
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder="Password"
              placeholderTextColor="#A0AEC0"
              onChangeText={(text) => setPassword(text.toLowerCase())}
              autoCapitalize="none"
            />

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Sign In</Text>
            </TouchableOpacity>

            {/* <View style={styles.loginLinkContainer}>
              <Text style={styles.loginText}>Dont have an account? </Text>
              <Link href="/(auth)/register" asChild>
                <TouchableOpacity>
                  <Text style={styles.loginLink}>Register</Text>
                </TouchableOpacity> */}
            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
            {/* </Link> */}
          </View>
        </View>
      </View>
      {/* </View> */}
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0dcf577",
  },
  overlay: {
    flex: 1,
    backgroundColor: "#f0dcf5)",
    justifyContent: "center",
    padding: 20,
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },
  headerContainer: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#745187",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#94A3B8",
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
  },
  input: {
    backgroundColor: "#74518722",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    color: "#745187",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  loginButton: {
    backgroundColor: "#745187",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  loginButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  forgotPassword: {
    marginTop: 16,
    alignItems: "center",
  },
  forgotPasswordText: {
    color: "#94A3B8",
    fontSize: 14,
  },

  loginLinkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  loginText: {
    color: "#94A3B8",
    fontSize: 14,
  },
  loginLink: {
    color: "#745187",
    fontSize: 14,
    fontWeight: "500",
  },
});
