import { currentUser } from "@/api/auth";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const UserProfile = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getUser"],
    queryFn: async () => await currentUser(),
  });

  isLoading && <Text>Loading ....</Text>;
  isError && <Text>Error Fetching Data.</Text>;

  useEffect(() => {
    currentUser();
    console.log(data);
  }, []);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        // backgroundColor: "grey",
        borderRadius: 10,
        width: "95%",
        margin: 10,
        borderWidth: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          flex: 1,
        }}
      >
        {data?.image ? (
          <Image
            source={{ uri: data?.image }}
            style={{
              height: 100,
              width: 100,
              borderWidth: 1,
              borderColor: "#000",
              borderRadius: "50%",
            }}
          />
        ) : (
          <Image
            source={{ uri: data?.image }} //require("@/assets/images/noAvatar.png")
            style={{
              height: 100,
              width: 100,
              borderWidth: 1,
              borderColor: "#000",
              borderRadius: "50%",
            }}
          />
        )}

        <Text
          style={{
            fontSize: 25,
            // fontFamily:""
            fontWeight: "bold",
            // padding: 10,
            // flexDirection: "row",
            // flex: 1,
          }}
        >
          {data?.username}
        </Text>
      </View>

      {/* <Text>UserImage</Text> */}
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
