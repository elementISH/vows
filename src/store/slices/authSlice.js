// slices/authSlice.js
import axiosInstance from "@/utils/axios-instance";
import { toast } from "sonner";

export const createAuthSlice = (set, get) => ({
  isAuthenticated: false,
  user: null,
  token: null,
  lang: "en",

  setLang: (lang) => set({ lang }),

  login: async (credentials, type = "default") => {
    const requestUrl =
      type === "default" ? "/auth/login" : "/auth/google/callback";
    try {
      const response = await axiosInstance.post(requestUrl, credentials);
      const { data } = response.data;

      set({
        isAuthenticated: true,
        user: data.user,
        token: data.token,
      });

      toast.success("Logged in successfully");
      return { success: true };
    } catch (err) {
      const msg =
        (err.response.status !== 500 && err.response?.data?.message) ||
        "Login failed";
      toast.error(msg);
      return { success: false, message: msg };
    }
  },

  register: async (formData) => {
    try {
      const response = await axiosInstance.post("/auth/register", formData);
      const { data } = response.data;

      set({
        isAuthenticated: true,
        user: data.user,
        token: data.token,
      });

      toast.success("Registered successfully");
      return { success: true };
    } catch (err) {
      const errors = err.response?.data?.data;
      const msg = err.response?.data?.message || "Registration failed";
      if (errors) {
        Object.values(errors)
          .flat()
          .forEach((error) => console.log(error));
        toast.error(msg);
      } else {
        toast.error(msg);
      }

      return { success: false, message: msg };
    }
  },

  logout: async () => {
    try {
      const token = get().token;
      if (token) {
        await axiosInstance.post("/auth/logout", null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    }

    set({ isAuthenticated: false, user: null, token: null });
    toast.success("Logged out");
  },
});
