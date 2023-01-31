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
  ])

  const authData = {
    username: cookies.username,
    email: cookies.email,
    accessToken: cookies.accessToken,
    role: cookies.role,
  };
  
  const isLoggedIn = 
  !_.isNil(authData.username) &&
  !_.isNil(authData.email) &&
  !_.isNil(authData.accessToken)

  const isLoggedAdmin =
  !_.isNil(authData.username) &&
  !_.isNil(authData.email) &&
  !_.isNil(authData.accessToken) &&
  !_.isNil(authData.role) 

  const setAuth = (data: AuthData) => {
    setCookie("username", data.username);
    setCookie("email", data.email);
    setCookie("accessToken", data.accessToken);
    setCookie("role", data.role);
  }

  const clearAuth = () => {
    removeCookie("username");
    removeCookie("email");
    removeCookie("accessToken");
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