import { getToken } from "@/api/storage";
import AuthContext from "@/conext/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
// import colors from "@"

export default function RootLayout() {
  const queryClient = new QueryClient();
  const [isAuth, setIsAuth] = useState(false);
  const [isReady, setReady] = useState(false);

  const checkToken = async () => {
    const token = await getToken();
    if (token) {
      setIsAuth(true);
    }
    setReady(true);
  };
  useEffect(() => {
    checkToken();
  }, []);
  if (!isReady) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={"large"} color={"white"} />
      </View>
    );
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "lightgrey" }}>
        <QueryClientProvider client={queryClient}>
          <AuthContext.Provider value={{ isAuth, setIsAuth }}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="(tabs)" />
            </Stack>
          </AuthContext.Provider>
        </QueryClientProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
