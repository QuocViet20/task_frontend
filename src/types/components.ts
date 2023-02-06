import { ReactNode } from "react";

import {
  EditUserForm,
  ITaskFormData,
  Option,
  ResetPasswordForm,
  Task,
  UserCreate,
} from "./data";

export interface TaskFormProps {
  formTitle: string;
  assigneOptions: Option[];
  defaultValues: ITaskFormData;
  submitButtonLabel: string;
  submittingButtonLabel: string;
  isSubmitting: boolean;
  onSubmit: (data: ITaskFormData) => void;
}

export interface UserEditFormProps {
  defaultValues: EditUserForm;
  submitButtonLabel: string;
  submittingButtonLabel: string;
  isSubmitting: boolean;
  onSubmit: (data: EditUserForm) => void;
}

export interface PanigationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export interface TaskListComponentProps {
  tasks: Task[];
  assigneeOptions: Option[]
  handleDeleteTask: (id: number) => void;
}

export interface PageLayoutProps {
  children?: ReactNode;
}
