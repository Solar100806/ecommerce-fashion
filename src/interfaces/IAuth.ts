export interface RegisterInput {
  username: string;
  email: string;
  password: string;
  rePassword: string;
}

export type LoginInput = Omit<RegisterInput, "username" | "rePassword">;
