import axios from "axios";
import { store } from "../app/store";
import { logout, refreshAccessToken } from "./authApi";
import { logoutFulfilled } from "@/app/features/auth/authSlice";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error(
      "Interceptor caught an error:",
      error.response?.status,
      error.message
    );

    const originalRequest = error.config;

    const shouldRefreshToken =
      error.response?.status === 401 &&
      (error.response?.data?.message === "Token has expired" ||
        error.response?.data?.message === "You are not authenticated" ||
        error.response?.data?.message === "Session timeout");

    if (shouldRefreshToken && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await refreshAccessToken();
        const newToken = response?.data.accessToken;

        if (newToken) {
          localStorage.setItem("accessToken", newToken);

          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return api(originalRequest);
        } else {
          console.error("Received empty token from refresh attempt");
          throw new Error("Failed to refresh token");
        }
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
        await logout();
        store.dispatch(logoutFulfilled());

        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
