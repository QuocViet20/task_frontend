import axios from "axios";
import { UserCreate, User, UserLogin } from "../types";

export const apiClient = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-type": "application/json",
  },
});

export const createUser = (user: UserCreate) => apiClient.post("/users", user);

