import { Role, INewUser } from "../../../types";

export const DEFAULT_EDITUSER_DATA: INewUser = {
  email: "",
  username: "",
  password: "",
  accessToken: "",
  role: Role.User,
};

export const SUBMIT_BUTTON_LABEL = "Edit";

export const SUBMITTING_BUTTON_LABEL = "Editting";
