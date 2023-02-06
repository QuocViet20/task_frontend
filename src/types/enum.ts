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
  CreateTaskAdmin = "/tasks/create_task_admin",
  EditTask = "/tasks/:taskId/edit",
  EditUser = "/users/:userId/edit",
  ResetPasswordUser = "/user/:userId/resetPassword",
  InfomationUser = "users/:userId",
  MyTasks = "user/:userId/myTasks",
  MyInfomation = "user/:userId/myInformation"
}
