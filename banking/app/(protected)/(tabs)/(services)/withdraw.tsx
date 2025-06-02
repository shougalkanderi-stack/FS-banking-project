// import { currentUser, withdrawMoney } from "@/api/auth";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { router } from "expo-router";
// import React, { useState } from "react";
// import {
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   Platform,
//   SafeAreaView,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";

// const Withdraw = () => {
//   const [amount, setAmount] = useState("");

//   const { data, isLoading } = useQuery({
//     queryKey: ["getUser"],
//     queryFn: async () => await currentUser(),
//   });

//   const { mutate, isPending, isError, isSuccess } = useMutation({
//     mutationKey: ["withdrawMoney"],
//     mutationFn: async () => {
//       await withdrawMoney(Number(amount));
//     },
//     onSuccess: () => {
//       alert("Withdrawal successful!");
//       router.back();
//     },
//     onError: () => {
//       alert("Failed to withdraw. Please try again.");
//     },
//   });

//   const handleWithdraw = () => {
//     const numAmount = Number(amount);
//     if (numAmount > 1 && numAmount <= data?.balance) {
//       mutate();
//     } else if (numAmount <= 1) {
//       alert("Cannot withdraw amount less than 1 KWD");
//     } else if (numAmount > data?.balance) {
//       alert("Amount exceeds your current balance");
//     } else {
//       alert("Please enter a valid amount");
//     }
//   };

//   if (isLoading) {
//     return (
//       <View>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//       >
//         <View>
//           <View>
//             <Text>Withdraw Money</Text>
//             <Text>Current Balance: {data?.balance.toFixed(2)} KWD</Text>
//           </View>

//           <View>
//             <Text>Amount (KWD)</Text>
//             <TextInput
//               placeholder="Enter amount to withdraw"
//               keyboardType="numeric"
//               value={amount}
//               onChangeText={setAmount}
//             />

//             <TouchableOpacity
//               onPress={handleWithdraw}
//               disabled={isPending || !amount}
//             >
//               <Text>{isPending ? "Processing..." : "Withdraw"}</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default Withdraw;
