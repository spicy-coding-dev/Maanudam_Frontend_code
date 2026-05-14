export type UserStatus = "ACTIVE" | "PENDING" | "BLOCKED";

export type User = {
  id: number;
  name: string;
  email: string;
  mobile: string;
  role: string;
  status: "ACTIVE" | "PENDING" | "BLOCKED";
  emailVerified: boolean;
  createdAt: string;
};
