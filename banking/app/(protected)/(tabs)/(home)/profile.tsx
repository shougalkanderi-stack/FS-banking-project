import { currentUser } from "@/api/auth";
import { deleteToken } from "@/api/storage";
import AuthContext from "@/conext/AuthContext";
import getImageUrl from "@/helper/helperFunctions";
import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const profile = () => {
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

  return (
    <View>
      <View
        style={{
          backgroundColor: "#eacdc2",
          height: 150,
          width: 150,
          borderRadius: 50,
        }}
      >
        {imageUrl && (
          <Image
            source={{ uri: imageUrl }}
            style={{
              height: 150,
              width: 150,
              borderRadius: 50,
              justifyContent: "center",
            }}
          />
        )}
      </View>

      <Text
        style={{
          backgroundColor: "white",
          padding: 10,
          borderRadius: 5,
          marginTop: 20,
          width: 500,
          fontSize: 20,
        }}
      >
        {data?.username}
      </Text>
      {/* <Text
    //     style={{
    //       backgroundColor: "white",
    //       padding: 10,
    //       borderRadius: 5,
    //       marginTop: 20,
    //     }}
    //   /> */}

      <TouchableOpacity
        style={{
          backgroundColor: "white",
          padding: 10,
          borderRadius: 5,
          marginTop: 20,
          alignItems: "center",
        }}
        onPress={LogOut}
      >
        <Text
          style={{
            color: "#111827",
            fontWeight: "bold",
            fontSize: 15,
          }}
        >
          Log out
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default profile;
