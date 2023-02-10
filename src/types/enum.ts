export enum Status {
  All = "",
  Todo = "Todo",
  Done = "Done",
  Doing = "Doing",
}

export enum Role {
  Admin = "Admin",
  User = "User",
}

export enum RoutePath {
  NotFound = "*",
  Home = "/",
  Login = "/login",
  Register = "/register",
  UserList = "/users",
  TaskList = "/tasks",
  CreateUser = "/users/create",
  CreateTask = "/tasks/create",
  EditTask = "/tasks/:taskId/edit",
  EditUser = "/users/:userId/edit",
  ResetPasswordUser = "/users/:userId/resetPassword",
  InfomationUser = "users/:userId",
  MyInfomation = "users/:userId/myInformation",
  Kanban = "/kanban"
}
