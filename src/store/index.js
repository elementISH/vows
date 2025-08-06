import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { createCartSlice } from "./slices/cartSlice";
import { createAuthSlice } from "./slices/authSlice";
import { createShopSlice } from "./slices/shopSlice";

export const useStore = create(
  devtools(
    persist(
      (...a) => ({
        ...createCartSlice(...a),
        ...createAuthSlice(...a),
        ...createShopSlice(...a),
      }),
      {
        name: "vows-global-store",
        partialize: (state) => ({
          isAuthenticated: state.isAuthenticated,
          user: state.user,
          token: state.token,
          products: state.products,
          categories: state.categories,
        }),
      }
    )
  )
);
