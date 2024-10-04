import { AxiosError } from "axios";
import { toast } from "react-toastify";
import axios from "axios";

interface ErrorResponse {
  message: string;
  accountType?: string;
}

export interface ApiError {
  message: string;
  status?: number;
}

const errorHandle = (error: Error | AxiosError): ApiError => {
  const apiError: ApiError = {
    message: "An unknown error occurred",
  };

  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ErrorResponse>;
    apiError.status = axiosError.response?.status;

    if (axiosError.response?.data) {
      const errorResponse = axiosError.response.data;
      apiError.message = errorResponse.message || apiError.message;

      if (apiError.status === 403 && errorResponse.accountType === "user") {
        toast.error(apiError.message);
        if (window.location.pathname !== "/home") {
          setTimeout(() => {
            window.location.href = "/home";
          }, 2000);
        }
      } else {
        toast.error(apiError.message);
      }
    } else {
      toast.error(apiError.message);
    }
  } else {
    apiError.message = error.message || apiError.message;
    toast.error(apiError.message);
  }

  return apiError;
};

export default errorHandle;
