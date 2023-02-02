import { Role, UserCreate } from "../../types";

export const DEFAULT_EDITUSER_DATA: UserCreate = {
  email:"",
  username: "",
  password:"",
  accessToken:"",
  role: Role.User
}

export const TASK_FORM_TITLE = " Create task";

export const SUBMIT_BUTTON_LABEL = "Create Task";

export const SUBMITTING_BUTTON_LABEL = "Creating Task";