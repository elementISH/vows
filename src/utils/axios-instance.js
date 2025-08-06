import axios from "axios";
import { useStore } from "@/store";
import { API_BASE_URL } from "@/config";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Accept-Language": "en",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const state = useStore.getState();
  const token = state.token;
  const lang = state.lang || "en";

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.headers["Accept-Language"] = lang;

  return config;
});

export default axiosInstance;
