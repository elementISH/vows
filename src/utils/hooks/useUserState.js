"use client";
import { useStore } from "@/store";

export default function useUserState() {
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);

  return { isAuthenticated, user, logout };
}
