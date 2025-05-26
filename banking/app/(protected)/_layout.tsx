import AuthContext from "@/conext/AuthContext";
import { Redirect, Stack } from "expo-router";
import React, { useContext } from "react";
import { StyleSheet } from "react-native";

const protectedlayout = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  if (!isAuth) {
    return <Redirect href={"/(auth)/register"} />;
  }
  return (
    <Stack>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
};

export default protectedlayout;

const styles = StyleSheet.create({});
