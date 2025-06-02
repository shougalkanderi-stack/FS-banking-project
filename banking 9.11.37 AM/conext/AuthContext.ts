import { createContext } from "react";

const AuthContext = createContext({
  isAuth: false,
  setIsAuth: (isAuth: boolean) => {},
});

export default AuthContext;
