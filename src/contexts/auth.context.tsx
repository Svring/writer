"use client";

import { createContext, type ReactNode, use } from "react";
import type { User } from "@/payload-types";

type AuthContextValue = {
  user: (User & { collection: "users" }) | null;
};

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

type AuthProviderProps = {
  children: ReactNode;
  user: (User & { collection: "users" }) | null;
};

export function AuthProvider({ children, user }: AuthProviderProps) {
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = use(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
