import { ITaskFormData, Option } from "./data";
export interface TaskFormProps {
  formTitle: string;
  assigneOptions: Option[];
  defaultValue: ITaskFormData;
  submitButtonLabel: string;
  submittingButtonLabel: string;
  isSubmitting: boolean;
  onSubmit: (data: ITaskFormData) => void;
}
