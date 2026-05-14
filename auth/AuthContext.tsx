"use client";
import { createContext } from "react";

export type User = {
  name: string;
  email: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);
