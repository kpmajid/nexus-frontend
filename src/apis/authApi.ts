import api from "./axiosInstance";
import errorHandle from "./error";

export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response = await api.post("/auth/login", credentials);
    localStorage.setItem("accessToken", response.data.accessToken);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const logout = async () => {
  try {
    const response = await api.post("/auth/logout", {});
    localStorage.removeItem("accessToken");
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const refreshAccessToken = async () => {
  try {
    const response = await api.get("/auth/refresh-token");
    localStorage.setItem("accessToken", response.data.accessToken);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    console.log(err);
    // return errorHandle(err);
  }
};
