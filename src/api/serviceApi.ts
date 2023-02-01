import axios from "axios";
import { UserCreate, User, UserLogin, ITaskFormData, Task } from "../types";

export const apiClient = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-type": "application/json",
  },
});

export const createUser = (user: UserCreate) => 
  apiClient.post("/users", user);

export const getAssignee = () => apiClient.get("/users?role=User")

export const addTask = (task: ITaskFormData) =>
  apiClient.post("/tasks", task)

export const updateTask = (taskId: string, task: ITaskFormData) => 
  apiClient.put<ITaskFormData>(`/tasks/${taskId}`, task)

export const getTask = ( taskId: string) => apiClient.get<Task>(`/tasks/${taskId}`)

export const getTasks = (
  params:
  | {
    currentPage: number;
    limit: number;
    debouncedSearchHook: string;
    selectedStatus: string;
  }
  | {
    currentPage: number;
    limit: number;
    debouncedSearchHook: string;
    selectedStatus?: undefined;
  },
) => {
  return apiClient.get<Task>(`/task`, {
    params: {
      _page: params.currentPage,
      _limit: params.limit,
      q: params.debouncedSearchHook,
      status: params.selectedStatus,
    }
  })
}

export const getUsers = (
  params:
  | {
    currentPage: number;
    limit: number;
    debouncedSearchHook: string;
  }
  | {
    currentPage: number;
    limit: number;
    debouncedSearchHook: string;
  },
) => {
  return apiClient.get<User>(`/Users`, {
    params: {
      _page: params.currentPage,
      _limit: params.limit,
      q: params.debouncedSearchHook,
    }
  })
}

export const getUserId = (userId: string) =>
  apiClient.get<User>(`/users/${userId}`)

export const deleteTask = (id: number) =>
  apiClient.delete(`/tasks/${id}`)

  export const deleteUser = (id: number) =>
  apiClient.delete(`/users/${id}`)