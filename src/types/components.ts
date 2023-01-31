import { IFormUserCreateAccount, UserCreate } from "./data";

export interface UserFormProps {
  formTitle: string;
  submitButtonLabel: string;
  submittingButtonLabel: string;
  isSubmitting: boolean;
  onSubmit: (data: IFormUserCreateAccount) => void;
}