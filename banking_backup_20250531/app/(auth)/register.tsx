import { registerUser } from "@/api/auth";
import AuthContext from "@/context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

const Register = () => {
  const [image, setImage] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const { setIsAuth } = useContext(AuthContext);
  const router = useRouter();

  // Validation functions
  const validateUsername = (text: string) => {
    if (text.length < 3) {
      setErrors(prev => ({
        ...prev,
        username: "Username must be at least 3 characters long"
      }));
      return false;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(text)) {
      setErrors(prev => ({
        ...prev,
        username: "Username can only contain letters, numbers, and underscores"
      }));
      return false;
    }
    setErrors(prev => ({ ...prev, username: "" }));
    return true;
  };

  const validatePassword = (text: string) => {
    if (text.length < 6) {
      setErrors(prev => ({
        ...prev,
        password: "Password must be at least 6 characters long"
      }));
      return false;
    }
    setErrors(prev => ({ ...prev, password: "" }));
    return true;
  };

  const validateConfirmPassword = (text: string) => {
    if (text !== password) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: "Passwords do not match"
      }));
      return false;
    }
    setErrors(prev => ({ ...prev, confirmPassword: "" }));
    return true;
  };

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          "Permission Required",
          "Please allow access to your photo library to select a profile picture.",
          [{ text: "OK" }]
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to pick image. Please try again.",
        [{ text: "OK" }]
      );
    }
  };

  const mutation = useMutation({
    mutationKey: ["register"],
    mutationFn: () => {
      // Validate all fields before submission
      const isUsernameValid = validateUsername(username);
      const isPasswordValid = validatePassword(password);
      const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);

      if (!isUsernameValid || !isPasswordValid || !isConfirmPasswordValid) {
        throw new Error("Please fix the validation errors");
      }

      if (!image) {
        throw new Error("Please select a profile picture");
      }

      return registerUser({ username, password, image });
    },
    onSuccess: () => {
      Alert.alert(
        "Success!",
        "Your account has been created successfully. Please log in.",
        [
          {
            text: "OK",
            onPress: () => {
              setIsAuth(true);
              router.replace("/(auth)/login");
            }
          }
        ]
      );
    },
    onError: (error: Error) => {
      Alert.alert(
        "Registration Failed",
        error.message || "Something went wrong. Please try again.",
        [{ text: "OK" }]
      );
    },
  });

  const isLoading = mutation.status === 'pending';
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
          source={require('@/assets/images/icon.png')}
          style={styles.bankLogo}
        />

        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join our secure banking platform</Text>

        {/* Profile Image Picker */}
        <TouchableOpacity onPress={pickImage} style={styles.imagePickerContainer}>
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
              <Text style={styles.imagePickerText}>Tap to add profile photo</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Form Fields */}
        <View style={styles.form}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.input, errors.username ? styles.inputError : null]}
              placeholder="Username"
              placeholderTextColor="#94A3B8"
              value={username}
              onChangeText={(text) => {
                setUsername(text);
                validateUsername(text);
              }}
              autoCapitalize="none"
            />
            {errors.username ? (
              <Text style={styles.errorText}>{errors.username}</Text>
            ) : (
              <Text style={styles.helperText}>
                Use letters, numbers, and underscores only
              </Text>
            )}
          </View>

          <View style={styles.inputWrapper}>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[
                  styles.input,
                  styles.passwordInput,
                  errors.password ? styles.inputError : null
                ]}
                placeholder="Password"
                placeholderTextColor="#94A3B8"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  validatePassword(text);
                }}
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
            {errors.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : (
              <Text style={styles.helperText}>
                Minimum 6 characters required
              </Text>
            )}
          </View>

          <View style={styles.inputWrapper}>
            <TextInput
              style={[
                styles.input,
                errors.confirmPassword ? styles.inputError : null
              ]}
              placeholder="Confirm Password"
              placeholderTextColor="#94A3B8"
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                validateConfirmPassword(text);
              }}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            {errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}
          </View>

          <TouchableOpacity
            style={[
              styles.button,
              isLoading && styles.buttonDisabled,
              (!username || !password || !confirmPassword || !image) && styles.buttonDisabled
            ]}
            onPress={() => mutate()}
            disabled={isLoading || !username || !password || !confirmPassword || !image}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
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
    backgroundColor: '#0C4A6E',
  },
  content: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#0C4A6E',
  },
  bankLogo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 24,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
    marginTop: 8,
    marginBottom: 32,
    textAlign: 'center',
  },
  imagePickerContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  imageWrapper: {
    position: 'relative',
    marginBottom: 8,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editBadge: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#38BDF8',
    borderRadius: 15,
    padding: 8,
    borderWidth: 2,
    borderColor: '#0C4A6E',
  },
  editIcon: {
    width: 14,
    height: 14,
    tintColor: '#FFFFFF',
  },
  placeholderImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  addPhotoIcon: {
    width: 32,
    height: 32,
    tintColor: '#94A3B8',
  },
  imagePickerText: {
    color: '#38BDF8',
    fontSize: 14,
    marginTop: 4,
  },
  form: {
    width: '100%',
    maxWidth: 400,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  inputError: {
    borderColor: '#EF4444',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  helperText: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  showPasswordButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderLeftWidth: 0,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  visibilityIcon: {
    width: 20,
    height: 20,
    tintColor: '#94A3B8',
  },
  button: {
    backgroundColor: '#38BDF8',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  loginText: {
    color: '#94A3B8',
    fontSize: 14,
  },
  loginLink: {
    color: '#38BDF8',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default Register;
