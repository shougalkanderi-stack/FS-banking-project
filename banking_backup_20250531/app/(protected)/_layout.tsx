import AuthContext from "@/context/AuthContext";
import { Redirect, Stack } from "expo-router";
import React, { useContext } from "react";

const ProtectedLayout = () => {
  const { isAuth } = useContext(AuthContext);
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
