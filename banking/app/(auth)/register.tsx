import React from "react";
import { StyleSheet, Text, View } from "react-native";
//   import colors from "../../data/styling/colors";

const register = () => {
  return (
    <View>
      <Text>register</Text>
    </View>
  );
};

export default register;

const styles = StyleSheet.create({});

// const Register = () => {
//   const [image, setImage] = useState("");
//   const [userName, setUserName] = useState("");
//   const [password, setPassword] = useState("");
//   const { setIsAuth } = useContext(AuthContext);
//   const router = useRouter();
//   const userObj: userInfo = {
//     username: userName,
//     password: password,
//     image: image,
//   };

//   const pickImage = async () => {
//     // No permissions request is necessary for launching the image library
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ["images"],
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     console.log(result);

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//     }
//   };

//   const { mutate } = useMutation({
//     mutationKey: ["register"],
//     mutationFn: () => register(userObj),
//     onSuccess:()=>{
//         setIsAuth(true);
//         router.replace("/")
//     },
//   });
// }
