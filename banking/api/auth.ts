import userInfo from "@/types/UserInfo";
import instance from ".";
import { getToken, saveToken } from "./storage";

const login = async (userInfo: userInfo) => {
  const { data } = await instance.post(
    "/mini-project/api/auth/login",
    userInfo
  );
  if (data.token) {
    await saveToken("token", data.token);
  }
  return data;
};

const registerUser = async ({ username, password, image }: userInfo) => {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  formData.append("image", {
    name: "image.jpg",
    uri: image,
    type: "image/jpg",
  } as any);
  const token = getToken();
  const { data } = await instance.post(
    "/mini-project/api/auth/register",
    formData,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data;
};

const currentUser = async () => {
  const { data } = await instance.get("/mini-project/api/auth/me");
  return data;
};

export { currentUser, login, registerUser };
