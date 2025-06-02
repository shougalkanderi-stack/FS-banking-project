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
    <ScrollView style={{ backgroundColor: "#0C4A6E" }}>
      <View
        style={{
          backgroundColor: "0C4A6E",
        }}
      >
        {userList}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0C4A6E",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  profileButton: {
    borderRadius: 35,
    overflow: "hidden",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5e548e",
  },
  transactionsContainer: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  transactionsList: {
    paddingBottom: 24,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 24,
  },
  emptyText: {
    color: "#94A3B8",
    fontSize: 16,
  },
  dateRangeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  dateButton: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  dateButtonLabel: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 4,
  },
  dateButtonText: {
    fontSize: 14,
    color: "#1E293B",
    fontWeight: "500",
  },
  dateRangeSeparator: {
    marginHorizontal: 8,
    color: "#64748B",
    fontSize: 14,
  },
  clearButton: {
    marginLeft: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#EF4444",
  },
  clearButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "500",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    margin: 20,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 16,
    textAlign: "center",
  },
  modalCloseButton: {
    backgroundColor: "#EF4444",
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  modalCloseButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "600",
  },
});

export default network;
