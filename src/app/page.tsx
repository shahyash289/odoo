"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { token, user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.replace("/login");
      return;
    }

    if (user?.role === "admin") {
      router.replace("/admin");
      return;
    }

    if (user?.role === "employee") {
      router.replace("/");
      return;
    }
  }, [token, user, router]);

  if (!token || !user) return null;

  return (
    <div style={{ padding: 40 }}>
      <h2>You are logged in</h2>
      <p>Role: {user.role}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
