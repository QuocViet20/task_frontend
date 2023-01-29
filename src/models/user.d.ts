
export type Role = {
  admin:"Admin",
  user: "User"
}

export interface User {
  email: string,
  username: string,
  password: string,
  role: Role,
  userId: string,
}