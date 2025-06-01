import userInfo from "@/types/UserInfo";
import instance from ".";
import { getToken, saveToken } from "./storage";

const Login = async (username: string, password: string) => {
  const { data } = await instance.post("/mini-project/api/auth/login", {
    username,
    password,
  });
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
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
};

const currentUser = async () => {
  const { data } = await instance.get("/mini-project/api/auth/me");
  return data;
};

const getAllUsers = async () => {
  const { data } = await instance.get("/mini-project/api/auth/users");
  return data;
};

export { currentUser, getAllUsers, Login, registerUser };
