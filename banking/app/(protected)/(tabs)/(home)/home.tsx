import { deleteToken } from "@/api/storage";
import UserProfile from "@/components/UserProfile";
import AuthContext from "@/conext/AuthContext";
import { Link } from "expo-router";
import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
const home = () => {
  const LogOut = async () => {
    deleteToken();
    setIsAuth(false);
  };
  const { setIsAuth } = useContext(AuthContext);
  // const user: userInfo = {
  //   username: "",
  //   image: "",
  //   password: "",
  // };
  // const [userr, setUser] = useState<userInfo>(user);
  // const getCurrentUser = async () => {
  //   const newUser = await currentUser();
  // };
  // const { data } = useQuery({
  //   queryKey: ["getUser"],
  //   queryFn: () => currentUser(),
  // });
  // useEffect(() => {
  //   const getUserInfo = async () => {
  //     const response = await currentUser();
  //     return response;
  //   };
  //   getUserInfo();
  // }, []);

  // useEffect(() => {
  //   const getCurrentUser = async () => {
  //     const newUser = await currentUser();
  //     setUser(newUser);
  //   };
  //   getCurrentUser();
  // }, []);

  return (
    <View>
      <Link href={"/(protected)/(tabs)/(home)/profile"}>
        <UserProfile />
      </Link>
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
            fontSize: 16,
          }}
        >
          LogOut
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default home;

const styles = StyleSheet.create({});
