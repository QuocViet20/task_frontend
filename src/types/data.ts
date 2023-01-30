export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

export interface UserCreate {
  username: string;
  email: string;
  password: string;
}

export interface UserCreateAccount {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserLogin {
  email: string;
  password: string;
}
