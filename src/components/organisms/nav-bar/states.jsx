"use client";
import { useUserState } from "@/utils/hooks";

export const useNavbarState = () => {
  const { isAuthenticated, user, logout } = useUserState();
  return { isAuthed: isAuthenticated, user, logout };
};
