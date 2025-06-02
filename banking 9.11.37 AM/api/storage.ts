import * as SecureStore from "expo-secure-store";

const saveToken = async (key: string, token: string) => {
  await SecureStore.setItemAsync("token", token);
};

const getToken = async () => {
  const token = await SecureStore.getItemAsync("token");

  return token;
};

const deleteToken = async () => {
  await SecureStore.deleteItemAsync("token");
};

export { deleteToken, getToken, saveToken };
