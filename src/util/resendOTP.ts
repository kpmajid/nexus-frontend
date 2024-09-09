import { toast } from "react-toastify";
import axios from "axios";

const resendOTP = async (email: string) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/auth/resend-otp",
      { email }
    );
    console.log("Resend OTP successful!", response.data);
    toast.success("Verification email sent. Please check your inbox.");
  } catch (error) {
    // Handle resend OTP error
    console.log(error);
  }
};

export default resendOTP;
