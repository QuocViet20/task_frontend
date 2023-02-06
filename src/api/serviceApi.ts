import axios from "axios";
import { UserCreate, User, UserLogin, ITaskFormData, Task } from "../types";
import { API_URL } from "./consts";

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

export const createUser = (user: UserCreate) => {
  return apiClient.post("/users", user);
}

export const getAssignee = () => apiClient.get("/users?role=User")

export const addTask = (task: ITaskFormData) => {
  return apiClient.post("/tasks", task)
}

export const updateTask = (taskId: string, task: ITaskFormData) => {
  return apiClient.put<ITaskFormData>(`/tasks/${taskId}`, task)
}

export const getTask = ( taskId: string) => apiClient.get<Task>(`/tasks/${taskId}`)

export const getTasks = (
  params:
  | {
    currentPage: number;
    limit: number;
    searchText: string;
    status: string | undefined;
  }
) => {
  return apiClient.get<Task>(`/tasks`, {
    params: {
      _page: params.currentPage,
      _limit: params.limit,
      q: params.searchText,
      status: params.status,
    }
  })
}

export const getTaskAssignee = (
  params:
  | {
    currentPage: number;
    limit: number;
    searchText: string;
    status: string | undefined;
    assignee: string
  }
) => {
  return apiClient.get<Task>(`/tasks`, {
    params: {
      _page: params.currentPage,
      _limit: params.limit,
      q: params.searchText,
      status: params.status,
      assignee: params.assignee,
    }
  })
}

export const getUsers = (
  params:
  | {
    currentPage: number;
    limit: number;
    searchText: string;
  }
) => {
  return apiClient.get<User>(`/Users?role=User`, {
    params: {
      _page: params.currentPage,
      _limit: params.limit,
      q: params.searchText,
    }
  })
}

export const getUserId = (userId: string) => {
  return apiClient.get<UserCreate>(`/users/${userId}`)
}

export const deleteTask = (id: number) => {
  return apiClient.delete(`/tasks/${id}`)
}

export const deleteUser = (id: number) => {
  return apiClient.delete(`/users/${id}`)
}

export const updateUser = ( userId: string, user: UserCreate) => {
  return apiClient.put<UserCreate>(`/users/${userId}`, user)
}