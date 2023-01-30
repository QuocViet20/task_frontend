import axios from "axios";
import { UserCreate, User, UserLogin } from "../types";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-type": "application/json",
  },
});

export const creteUser = (user: UserCreate) => apiClient.post("/users", user);

export const userLogin = (user: UserLogin) => apiClient.post("/login", user);
