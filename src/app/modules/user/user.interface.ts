export interface IUser {
  email: string;
  password: string;
  status: "active" | "inactive";
  fullName: string;
  role?: string;
  avatar?: string;
  rememberMe?: boolean;
  phoneNo?: string;
}
