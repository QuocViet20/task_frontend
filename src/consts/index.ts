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
  status: Status.Todo,
};

export const RECORDS_PER_PAGE = 2;

export const STATUS_DATA  = [
  {value:"", text:"ALl"},
  {value:"Todo", text:"Todo"},
  {value:"Doing", text:"Doing"},
  {value:"Done", text:"Done"},
]