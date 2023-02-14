import axios from "axios";
import { INewUser, User, ITaskFormData, Task, NewTask} from "../types";
import { API_URL } from "./consts";

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

export const createUser = (user: INewUser) => {
  return apiClient.post("/users", user);
};

export const getAssignee = () => apiClient.get("/users?role=User");

export const addTask = (task: NewTask) => {
  return apiClient.post("/tasks", task);
};

export const updateTask = (taskId: string, task: NewTask) => {
  return apiClient.put<NewTask>(`/tasks/${taskId}`, task);
};

export const getTask = (taskId: string) =>
  apiClient.get<Task>(`/tasks/${taskId}`);

export const getTasks = (params:| {
  currentPage: number;
  limit: number;
  searchText: string;
  status?: string | undefined;
}) => {
  return apiClient.get<Task>(`/tasks`, {
    params: {
      _page: params.currentPage,
      _limit: params.limit,
      q: params.searchText,
      status: params.status,
    },
  });
};

export const getTaskAdmin = ((userId: string) => {
  return apiClient.get(`/tasks?assignee=${userId}`)
})

export const getAllTask = () => apiClient.get('/tasks')

export const getTaskAssignee = (params: {
  currentPage: number;
  limit: number;
  searchText: string;
  status?: string | undefined;
  assignee: string;
}) => {
  return apiClient.get<Task>(`/tasks`, {
    params: {
      _page: params.currentPage,
      _limit: params.limit,
      q: params.searchText,
      status: params.status,
      assignee: params.assignee,
    },
  });
};

export const getUsers = (params: {
  currentPage: number;
  limit: number;
  searchText: string;
}) => {
  return apiClient.get<User>(`/Users?role=User`, {
    params: {
      _page: params.currentPage,
      _limit: params.limit,
      q: params.searchText,
    },
  });
};

export const getUserId = (userId: string) => {
  return apiClient.get<INewUser>(`/users/${userId}`);
};

export const deleteTask = (id: number) => {
  return apiClient.delete(`/tasks/${id}`);
};

export const deleteUser = (id: number) => {
  return apiClient.delete(`/users/${id}`);
};

export const updateUser = (userId: string, user: INewUser) => {
  return apiClient.put<INewUser>(`/users/${userId}`, user);
};
