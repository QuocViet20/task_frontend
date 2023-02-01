import { Status, ITaskFormData } from "../types";

export const TASK_STATE_DATA = [
  { label: "All", value: "" },
  { label: "Todo", value: Status.Todo },
  { label: "Doing", value: Status.Doing },
  { label: "Done", value: Status.Done },
];

export const DEFAULT_TASK_FORM_DATA: ITaskFormData = {
  title: "",
  startTime: "",
  endTime: "",
  assignee: "",
  progress: "0",
  status: Status.All,
};
