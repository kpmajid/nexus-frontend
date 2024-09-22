import { AxiosError } from "axios";
import api from "./axiosInstance";
import errorHandle from "./error";

export const updateName = async (name: string) => {
  try {
    if (!name || name.trim() === "") {
      throw new Error("Name cannot be empty");
    }

    const response = await api.put(`/users/profile/name`, { name });

    if (response.status === 200 && response.data) {
      return {
        success: true,
        message: "Name updated successfully",
        user: response.data.user,
      };
    } else {
      throw new Error("Unexpected response from server");
    }
  } catch (error) {
    errorHandle(error as Error | AxiosError);
    return {
      success: false,
      message: "Failed to update name",
    };
  }
};

export const updateAvatar = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("avatar", file);

    const response = await api.put("/users/profile/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    errorHandle(error as Error | AxiosError);
    return {
      success: false,
      message: "Failed to update name",
    };
  }
};

export const requestEmailChangeOTP = async (email: string) => {
  try {
    if (!email || email.trim() === "") {
      throw new Error("Email cannot be empty");
    }

    const response = await api.post(`/users/profile/email/request-otp`, {
      email,
    });

    if (response.status === 200 && response.data) {
      return {
        success: true,
        message: "OTP send successfully",
        user: response.data.user,
      };
    } else {
      throw new Error("Unexpected response from server");
    }
  } catch (error) {
    errorHandle(error as Error | AxiosError);
    return {
      success: false,
      message: "Failed to requesting email change OTP",
    };
  }
};

export const verifyEmailChangeOTP = async (email: string, otp: string) => {
  try {
    if (!email || email.trim() === "" || !otp || otp.trim() === "") {
      throw new Error("Email or OTP cannot be empty");
    }

    if (otp.length !== 6) {
      throw new Error("Invalid OTP length");
    }

    const response = await api.put(`/users/profile/email`, {
      email,
      otp,
    });

    if (response.status === 200 && response.data) {
      return {
        success: true,
        message: "Email updated successfully",
        user: response.data.user,
      };
    } else {
      throw new Error("Unexpected response from server");
    }
  } catch (error) {
    errorHandle(error as Error | AxiosError);
    return {
      success: false,
      message: "Failed to verifying email change OTP",
    };
  }
};
