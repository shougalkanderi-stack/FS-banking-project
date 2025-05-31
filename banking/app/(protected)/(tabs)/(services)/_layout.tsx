import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const serviceslayout = () => {
  return (
    <Stack>
      <Stack.Screen name="services" options={{ title: "Services" }} />
    </Stack>
    // <View>
    //   <Text>hello</Text>
    // </View>
  );
};

export default serviceslayout;

const styles = StyleSheet.create({});
