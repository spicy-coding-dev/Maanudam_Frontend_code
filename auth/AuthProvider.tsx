"use client";

import { useState } from "react";
import { AuthContext } from "./AuthContext";
import type { User } from "./AuthContext";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
