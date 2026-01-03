"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { token, logout } = useAuth();
  const router = useRouter();

  return (
    <div style={{ padding: 40 }}>
      {token ? (
        <>
          <h2>You are logged in</h2>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <h2>You are not logged in</h2>
          <button onClick={() => router.push("/login")}>Login</button>
          <button onClick={() => router.push("/signUp")}>Signup</button>
        </>
      )}
    </div>
  );
}
