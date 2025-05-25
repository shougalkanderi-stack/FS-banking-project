import userInfo from "@/types/UserInfo";
import instance from ".";
import { saveToken } from "./storage";

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

const register = async (userInfo: userInfo) => {
  const formData = new FormData();
  formData.append("username", userInfo.username);
  formData.append("password", userInfo.password);
  formData.append("image", {
    name: "image.jpg",
    uri: userInfo.image,
    type: "image/jpg",
  } as any);

  const { data } = await instance.post(
    "/mini-project/api/auth/register",
    formData
  );
  return data;
};

const currentUser = async () => {
  const { data } = await instance.get("/mini-project/api/auth/me");
  return data;
};

export { currentUser, login, register };
