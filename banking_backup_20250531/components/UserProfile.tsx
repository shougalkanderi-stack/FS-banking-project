import { currentUser } from "@/api/auth";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const UserProfile = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getUser"],
    queryFn: async () => await currentUser(),
  });

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }
  
  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error</Text>
      </View>
    );
  }

  // Helper function to construct full image URL for uploaded images
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return null;
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }
    const baseUrl = "https://react-bank-project.eapi.joincoded.com";
    return imagePath.startsWith("/") ? `${baseUrl}${imagePath}` : `${baseUrl}/${imagePath}`;
  };

  const imageUrl = getImageUrl(data?.image);
  const userInitial = data?.username?.charAt(0)?.toUpperCase() || '?';

  return (
    <View style={styles.profileContainer}>
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={styles.profileImage}
        />
      ) : (
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>{userInitial}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 35,
  },
  placeholderContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#0284c7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '600',
  },
  loadingContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#94A3B8',
    fontSize: 12,
  },
  errorContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
  },
});

export default UserProfile;
