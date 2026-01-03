"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

/**
 * Roles supported by the app
 */
type Role = "admin" | "employee";

/**
 * JWT payload shape
 */
type JwtPayload = {
  userId: string;
  email: string;
  role: Role;
  iat?: number;
  exp?: number;
};

/**
 * Auth context contract
 */
type AuthContextType = {
  token: string | null;
  user: { role: Role } | null;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Auth Provider
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<{ role: Role } | null>(null);

  /**
   * Restore auth state on refresh
   */
  useEffect(() => {
    const savedToken = localStorage.getItem("token");

    if (!savedToken) return;

    try {
      const decoded = jwtDecode<JwtPayload>(savedToken);

      setToken(savedToken);
      setUser({ role: decoded.role });
    } catch (err) {
      console.error("Invalid token", err);
      localStorage.removeItem("token");
    }
  }, []);

  /**
   * Login handler
   */
  const login = (token: string) => {
    try {
      const decoded = jwtDecode<JwtPayload>(token);

      localStorage.setItem("token", token);
      setToken(token);
      setUser({ role: decoded.role });
    } catch (err) {
      console.error("Invalid token", err);
    }
  };

  /**
   * Logout handler
   */
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Auth hook
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}
