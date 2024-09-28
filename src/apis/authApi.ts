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
    errorHandle(err);
    return null 
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

export const resetPassword = async (email: string) => {
  try {
    const response = await api.post("/auth/forgot-password", { email });
    if (response.status === 200 && response.data) {
      return {
        success: true,
        message: "Email send successfully",
        user: response.data.user,
      };
    } else {
      throw new Error("Unexpected response from server");
    }
  } catch (error) {
    const err: Error = error as Error;
    console.log(err);
  }
};

export const resetPasswordWithToken = async (
  token: string,
  password: string
) => {
  try {
    console.log(token,password, "in reset ooass")
    const response = await api.post("/auth/reset-password", {
      token,
      password,
    });

    if (response.status === 200 && response.data) {
      return {
        success: true,
        message: "Password updated successfully",
        user: response.data.user,
      };
    } else {
      throw new Error("Unexpected response from server");
    }
  } catch (error) {
    const err: Error = error as Error;
    console.log(err);
  }
};
