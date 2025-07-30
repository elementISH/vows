import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { createCartSlice } from "./slices/cartSlice";
import { createAuthSlice } from "./slices/authSlice";

export const useStore = create(
  devtools(
    persist(
      (...a) => ({
        ...createCartSlice(...a),
        ...createAuthSlice(...a),
      }),
      { name: "global-store" }
    )
  )
);
