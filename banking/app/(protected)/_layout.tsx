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
<<<<<<< HEAD
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
=======
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
>>>>>>> afcae267917f75207d4e631fb60d99b6294ebfff
    </Stack>
  );
};

export default ProtectedLayout;

const styles = StyleSheet.create({});
