import { getAllUsers } from "@/api/auth";
import AllUsers from "@/components/AllUsers";
import userInfo from "@/types/UserInfo";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const network = (user: userInfo) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getAllUser"],
    queryFn: async () => await getAllUsers(),
  });
  // this is just for loadind confirmation, I can make it pretty later :)
  if (isLoading) return <Text>Loading ....</Text>;
  if (isError) return <Text>Error Fetching Data.</Text>;

  console.log(data);

  // mapping data

  const userList = data?.map((user: userInfo) => {
    return (
      <AllUsers
        username={user.username}
        image={user.image}
        password={user.password}
      />
    );
  });

  // const allUser = data?.map((d: user) => {
  //   return <Text>{d.username}</Text>;
  // });

  return (
    <ScrollView>
      <View>{userList}</View>
    </ScrollView>
  );
};

export default network;

const styles = StyleSheet.create({});
