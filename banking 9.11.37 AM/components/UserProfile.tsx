import { currentUser } from "@/api/auth";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const UserProfile = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getUser"],
    queryFn: async () => await currentUser(),
  });

  if (isLoading) return <Text>Loading ....</Text>;
  if (isError) return <Text>Error Fetching Data.</Text>;

  // Helper function to construct full image URL for uploaded images
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) {
      console.log("No image path provided");
      return null;
    }

    console.log("Processing image path:", imagePath);

    // If it's already a full URL, return as is
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      console.log("Full URL detected:", imagePath);
      return imagePath;
    }

    // For uploaded images, construct the full URL
    const baseUrl = "https://react-bank-project.eapi.joincoded.com"; // Not the best way to do this, but keep it for now.

    // Handle different possible path formats
    let fullUrl;
    if (imagePath.startsWith("/")) {
      // Path starts with slash: /uploads/image.jpg
      fullUrl = `${baseUrl}${imagePath}`;
    } else {
      // Path doesn't start with slash: uploads/image.jpg
      fullUrl = `${baseUrl}/${imagePath}`;
    }

    console.log("Constructed full URL:", fullUrl);
    return fullUrl;
  };

  const imageUrl = getImageUrl(data?.image);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        height: 50,
        justifyContent: "space-evenly",
      }}
    >
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={{
            height: 50,
            width: 50,
            //   borderWidth: 1,
            //   borderColor: "#000",
            borderRadius: "50%",
          }}
        />
      ) : (
        <Image
          source={require("@/assets/images/noAvatar.png")}
          style={{
            height: 50,
            width: 50,
            //   borderWidth: 1,
            //   borderColor: "#000",
            borderRadius: "50%",
          }}
        />
      )}

      <Text
        style={{
          color: "#745187",
          fontSize: 20,
          fontFamily: "",
          fontWeight: "bold",
          padding: 10,
          // flexDirection: "row",
          // flex: 1,
        }}
      >
        My First Bank
      </Text>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
    backgroundColor: "#D3BDB0",
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 5,
  },
});
