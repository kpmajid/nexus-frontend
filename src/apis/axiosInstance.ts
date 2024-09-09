import axios from "axios";
import { store } from "../app/store";
import { logout, refreshToken } from "../app/features/auth/authSlice";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.accessToken;
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await store.dispatch(refreshToken());
        return api(originalRequest);
      } catch (refreshError) {
        // Handle refresh token failure (e.g., logout user)
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
