import AuthContext from "@/conext/AuthContext";
import { Redirect, Stack } from "expo-router";
import React, { useContext } from "react";
import { StyleSheet } from "react-native";

const ProtectedLayout = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  if (!isAuth) {
    return <Redirect href={"/(auth)/register"} />;
  }
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
};

export default ProtectedLayout;

const styles = StyleSheet.create({});
