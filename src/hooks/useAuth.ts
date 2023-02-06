import { useCookies } from "react-cookie";
import _ from "lodash"

// type
import { AuthData } from "../types";

const useAuth = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "username",
    "email", 
    "accessToken", 
    "role",
    "userId",
  ])

  const authData = {
    username: cookies.username,
    email: cookies.email,
    accessToken: cookies.accessToken,
    role: cookies.role,
    userId: cookies.userId
  };
  
  const isLoggedIn = 
  !_.isNil(authData.username) &&
  !_.isNil(authData.email) &&
  !_.isNil(authData.accessToken) &&
  !_.isNil(authData.userId)

  const isLoggedAdmin =
  !_.isNil(authData.username) &&
  !_.isNil(authData.email) &&
  !_.isNil(authData.accessToken) &&
  !_.isNil(authData.userId) &&
  authData.role ==="Admin"

  const setAuth = (data: AuthData) => {
    setCookie("username", data.username);
    setCookie("email", data.email);
    setCookie("accessToken", data.accessToken);
    setCookie("role", data.role);
    setCookie("userId", data.userId);
  }

  const clearAuth = () => {
    removeCookie("username");
    removeCookie("email");
    removeCookie("accessToken");
    removeCookie("role");
    removeCookie("userId");
    authData.userId ="";
  }
  
  return {
    isLoggedAdmin, 
    isLoggedIn, 
    authData, 
    setAuth, 
    clearAuth
  }
};

export default useAuth