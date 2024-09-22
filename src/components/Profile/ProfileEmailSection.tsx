import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { useCallback, useState } from "react";
import { requestEmailChangeOTP, verifyEmailChangeOTP } from "@/apis/userApi";
import { Button } from "@/components/ui/button";

import { updateEmail as updateEmailInSlice } from "@/app/features/auth/authSlice";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ProfileEmailSection = () => {
  const dispatch = useDispatch<AppDispatch>();

  const authUser = useSelector((state: RootState) => state.auth.user);
  if (!authUser) {
    throw new Error("User is not logged in");
  }

  const [email, setEmail] = useState(authUser.email);
  const [validationError, setValidationError] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  const validateEmail = useCallback((email: string) => {
    if (!email.trim()) {
      return "Email is required";
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email) ? "" : "Invalid email address";
  }, []);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setValidationError(validateEmail(newEmail));
  };

  const handleRequestEmailChange = async () => {
    const error = validateEmail(email);
    if (error) {
      setValidationError(error);
      return;
    }

    try {
      const result = await requestEmailChangeOTP(email);
      if (result.success) {
        setIsDialogOpen(true);
      } else {
        setValidationError("Failed to update name. Please try again.");
      }
    } catch (err) {
      console.log(err);
      setValidationError("An error occurred while updating the name.");
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const result = await verifyEmailChangeOTP(email, otp);
      if (result.success) {
        dispatch(updateEmailInSlice({ email }));
        setIsDialogOpen(false);
        setOtp("");
      } else {
        setOtpError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setOtpError("An error occurred while verifying the OTP.");
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-6">
      <div className="px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Email</h2>
        <p className="text-gray-600 mb-4">
          Enter the email address you want to use to log in with Nexus.
        </p>
        <div className="flex items-center">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className={`flex-grow px-3 py-2 border ${
              validationError ? "border-gray-500" : "border-gray-300"
            }  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2`}
          />
          <button
            type="button"
            className={`${
              validationError || email === authUser.email
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-black hover:bg-slate-900"
            } text-white rounded-md px-4 py-2 transition duration-300`}
            onClick={handleRequestEmailChange}
            disabled={!!validationError || email === authUser.email}
          >
            Change
          </button>
        </div>
        {validationError && (
          <p className="text-red-500 text-sm mt-1">{validationError}</p>
        )}
      </div>
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
        <p className="text-sm text-gray-500 italic">
          Email must be verified before it can be used for login.
        </p>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Verify Email Change</DialogTitle>
            <DialogDescription>
              Enter the OTP sent to your new email address.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value) => setOtp(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            {otpError && (
              <p className="text-red-500 text-sm mt-1">{otpError}</p>
            )}
          </div>
          <DialogFooter>
            <Button onClick={handleVerifyOTP} disabled={otp.length !== 6}>
              Verify
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default ProfileEmailSection;
  