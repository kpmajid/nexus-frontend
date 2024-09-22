import { toast } from "react-toastify";
import api from "./axiosInstance";
import errorHandle from "./error";

const resendOTP = async (email: string) => {
  try {
    await api.post("/auth/resend-otp", { email });

    toast.success("OTP resend successfull");
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export default resendOTP;
