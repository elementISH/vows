"use client";
import { useState } from "react";

export const useNavbarState = () => {
  const [isAuthed, setIsAuthed] = useState(true);

  return { isAuthed };
};
