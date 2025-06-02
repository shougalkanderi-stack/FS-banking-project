import { registerUser } from "@/api/auth";
import AuthContext from "@/conext/AuthContext";
import { useMutation } from "@tanstack/react-query";
import * as imagePicker from "expo-image-picker";
import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
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

const Register = () => {
  const [image, setImage] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setIsAuth } = useContext(AuthContext);
  const router = useRouter();

  const pickImage = async () => {
    const result = await imagePicker.launchImageLibraryAsync({
      mediaTypes: imagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const mutation = useMutation({
    mutationKey: ["register"],
    mutationFn: () => {
      if (password !== confirmPassword) {
        throw new Error("Passwords don't match");
      }
      return registerUser({ username, password, image: image || "" });
    },
    onSuccess: () => {
      setIsAuth(true);
      router.replace("/(auth)/login");
    },
    onError: (error: Error) => {
      console.log(error);
      // You could add proper error handling here
    },
  });

  const isLoading = mutation.status === "pending";
  const mutate = mutation.mutate;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar style="light" />
      <View style={styles.content}>
        {/* Logo/Bank Image */}
        <Image
          source={require("@/assets/images/icon.png")}
          style={styles.bankLogo}
        />

        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join our secure banking platform</Text>

        {/* Profile Image Picker */}
        <TouchableOpacity
          onPress={pickImage}
          style={styles.imagePickerContainer}
        >
          {image ? (
            <View style={styles.imageWrapper}>
              <Image source={{ uri: image }} style={styles.profileImage} />
              <View style={styles.editBadge}>
                <Image
                  source={require("@/assets/images/icon.png")}
                  style={styles.editIcon}
                />
              </View>
            </View>
          ) : (
            <View style={styles.placeholderImage}>
              <Image
                source={require("@/assets/images/noAvatar.png")}
                style={styles.addPhotoIcon}
              />
            </View>
          )}
          <Text style={styles.imagePickerText}>
            {image ? "Change Profile Photo" : "Add Profile Photo"}
          </Text>
        </TouchableOpacity>

        {/* Form Fields */}
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#94A3B8"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />

          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, styles.passwordInput]}
              placeholder="Password"
              placeholderTextColor="#94A3B8"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.showPasswordButton}
            >
              <Image
                source={require("@/assets/images/icon.png")}
                style={styles.visibilityIcon}
              />
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#94A3B8"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />

          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={() => mutate()}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </Text>
          </TouchableOpacity>

          <View style={styles.loginLinkContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <Link href="/(auth)/login" asChild>
              <TouchableOpacity>
                <Text style={styles.loginLink}>Sign In</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0C4A6E",
  },
  content: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    backgroundColor: "#0C4A6E",
  },
  bankLogo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 24,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#94A3B8",
    marginTop: 8,
    marginBottom: 32,
    textAlign: "center",
  },
  imagePickerContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  imageWrapper: {
    position: "relative",
    marginBottom: 8,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editBadge: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#38BDF8",
    borderRadius: 15,
    padding: 8,
    borderWidth: 2,
    borderColor: "#0C4A6E",
  },
  editIcon: {
    width: 14,
    height: 14,
    tintColor: "#FFFFFF",
  },
  placeholderImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  addPhotoIcon: {
    width: 32,
    height: 32,
    tintColor: "#94A3B8",
  },
  imagePickerText: {
    color: "#38BDF8",
    fontSize: 14,
  },
  form: {
    width: "100%",
    maxWidth: 400,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    color: "#FFFFFF",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  passwordInput: {
    flex: 1,
    marginBottom: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  showPasswordButton: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderLeftWidth: 0,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  visibilityIcon: {
    width: 20,
    height: 20,
    tintColor: "#94A3B8",
  },
  button: {
    backgroundColor: "#38BDF8",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
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
    color: "#38BDF8",
    fontSize: 14,
    fontWeight: "500",
  },
});

export default Register;
