"use client";

import { useLoadUser } from "@/hooks/useLoadUser";

export default function AuthBootstrap() {
  useLoadUser();   // 👈 here is the magic
  return null;
}
