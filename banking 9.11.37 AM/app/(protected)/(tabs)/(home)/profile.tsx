import { currentUser } from "@/api/auth";
import { deleteToken } from "@/api/storage";
import { getTransactions } from "@/api/transactions";
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
  const { setIsAuth } = useContext(AuthContext);

  // Fetch user data
  const { data: userData, isLoading: isLoadingUser } = useQuery({
    queryKey: ["getUser"],
    queryFn: async () => await currentUser(),
  });

  // Fetch transactions for balance
  const { data: transactions } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => getTransactions(),
  });

  const imageUrl = getImageUrl(userData?.image);

  // Calculate balance
  const balance =
    transactions?.reduce((total, t) => {
      if (t.type === "deposit") return total + t.amount;
      if (t.type === "withdraw" || t.type === "transfer")
        return total - t.amount;
      return total;
    }, 0) || 0;

  const currency = transactions?.[0]?.currency || "KWD";

  const handleLogout = async () => {
    await deleteToken();
    setIsAuth(false);
  };

  if (isLoadingUser) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
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
                    {userData?.username?.charAt(0)?.toCase() || "?"}
                  </Text>
                </View>
              )}
            </View>
          </View>

          <View style={styles.usernameContainer}>
            <Text style={styles.usernameLabel}>Welcome back,</Text>
            <Text style={styles.username}>{userData?.username}</Text>
            <Text style={[styles.usernameLabel, { marginTop: 16 }]}>
              Balance
            </Text>
            <Text style={styles.username}>
              {balance.toFixed(2)} {currency}
            </Text>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
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
  loadingContainer: {
    flex: 1,
    backgroundColor: "#0C4A6E",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#FFFFFF",
    fontSize: 16,
    marginTop: 12,
  },
  profileSection: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  imageWrapper: {
    padding: 3,
    backgroundColor: "#38BDF8",
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
    color: "#38BDF8",
    fontWeight: "600",
  },
  infoSection: {
    width: "100%",
    alignItems: "center",
  },
  usernameContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  welcomeText: {
    fontSize: 18,
    color: "#94A3B8",
    marginBottom: 8,
  },
  username: {
    fontSize: 36,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  usernameLabel: {
    fontSize: 16,
    color: "#94A3B8",
    marginBottom: 8,
  },
  actionsContainer: {
    width: "100%",
    alignItems: "center",
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
    marginBottom: 8,
  },
  logoutButtonText: {
    color: "#EF4444",
    fontSize: 18,
    fontWeight: "600",
  },
  logoutHint: {
    fontSize: 14,
    color: "#94A3B8",
    textAlign: "center",
    fontStyle: "italic",
  },
});

export default Profile;
