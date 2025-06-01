import { currentUser } from "@/api/auth";
import { deleteToken } from "@/api/storage";
import AuthContext from "@/conext/AuthContext";
import getImageUrl from "@/helper/helperFunctions";
import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Profile = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getUser"],
    queryFn: async () => await currentUser(),
  });

  const imageUrl = getImageUrl(data?.image);

  const LogOut = async () => {
    deleteToken();
    setIsAuth(false);
  };
  const { setIsAuth } = useContext(AuthContext);

  if (isLoading || isError) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>
          {isLoading ? "Loading..." : "Error loading profile"}
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.profileSection}>
          <View style={styles.imageWrapper}>
            <View style={styles.imageContainer}>
              {imageUrl ? (
                <Image source={{ uri: imageUrl }} style={styles.profileImage} />
              ) : (
                <View style={styles.placeholderImage}>
                  <Text style={styles.placeholderText}>
                    {data?.username?.charAt(0)?.toUpperCase() || "?"}
                  </Text>
                </View>
              )}
            </View>
          </View>

          <View style={styles.usernameContainer}>
            <Text style={styles.usernameLabel}>Welcome back,</Text>
            <Text style={styles.username}>{data?.username}</Text>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={LogOut}>
            <Text style={styles.logoutButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0C4A6E",
  },
  container: {
    flex: 1,
    backgroundColor: "#0C4A6E",
  },
  profileSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  imageWrapper: {
    padding: 3,
    backgroundColor: "#38bdf8",
    borderRadius: 110,
    marginBottom: 24,
  },
  imageContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 16,
  },
  profileImage: {
    height: 210,
    width: 210,
    borderRadius: 105,
    borderWidth: 4,
    borderColor: "#0C4A6E",
  },
  placeholderImage: {
    height: 210,
    width: 210,
    borderRadius: 105,
    backgroundColor: "#0C4A6E",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#0C4A6E",
  },
  placeholderText: {
    fontSize: 72,
    color: "#38bdf8",
    fontWeight: "600",
  },
  usernameContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  usernameLabel: {
    fontSize: 18,
    color: "#94A3B8",
    marginBottom: 8,
  },
  username: {
    fontSize: 36,
    fontWeight: "700",
    color: "#FFFFFF",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  logoutButton: {
    backgroundColor: "rgba(239, 68, 68, 0.15)",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    width: "100%",
    maxWidth: 300,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EF4444",
  },
  logoutButtonText: {
    color: "#EF4444",
    fontSize: 18,
    fontWeight: "600",
  },
  loadingText: {
    color: "#FFFFFF",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});

export default Profile;
