import { toast } from "react-toastify";
import { RootState } from "@/app/store";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { updatePassword } from "@/apis/userApi";

const ProfileChangePasswordSection = () => {
  const authUser = useSelector((state: RootState) => state.auth.user);
  if (!authUser) {
    throw new Error("User is not logged in");
  }

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const validatePassword = (password: string) => {
    if (!password.trim()) {
      return "Password is required";
    }
    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter.";
    }
    if (!/\d/.test(password)) {
      return "Password must contain at least one digit.";
    }
    if (!/[@$!%*?&]/.test(password)) {
      return "Password must contain at least one special character (e.g., @$!%*?&).";
    }

    return "";
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setNewPassword(password);
    setNewPasswordError(validatePassword(password));
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const password = e.target.value;
    setConfirmPassword(password);
    setConfirmPasswordError(
      password !== newPassword ? "Passwords do not match" : ""
    );
  };

  const handleChangePassword = () => {
    const newPasswordValidationError = validatePassword(newPassword);
    const confirmPasswordValidationError =
      confirmPassword !== newPassword ? "Passwords do not match" : "";

    setNewPasswordError(newPasswordValidationError);
    setConfirmPasswordError(confirmPasswordValidationError);

    if (!newPasswordValidationError && !confirmPasswordValidationError) {
      setIsDialogOpen(true);
    }
  };

  const confirmPasswordChange = async () => {
    try {
      const result = await updatePassword(newPassword);
      if (result?.success) {
        //toast
        toast.success("Password updated successfully");
      } else {
        //toast
        toast.error("Somethign went wrong!");
      }
    } catch (error) {
      console.log(
        error,
        "in confirmPasswordChange ProfileChangePasswordSection"
      );
      //toast
      toast.error(error.message);
    } finally {
      setIsDialogOpen(false);
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-6">
      <div className="px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Change Password
        </h2>
        <p className="text-gray-600 mb-4">
          Enter the email address you want to use to log in with Nexus.
        </p>

        <div className="mb-4">
          <input
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            placeholder="New Password"
            className={`w-full px-3 py-2 border ${
              newPasswordError ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {newPasswordError && (
            <p className="text-red-500 text-sm mt-1">{newPasswordError}</p>
          )}
        </div>

        <div className="mb-4">
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Confirm New Password"
            className={`w-full px-3 py-2 border ${
              confirmPasswordError ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {confirmPasswordError && (
            <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>
          )}
        </div>
        <button
          type="button"
          className={`w-full px-4 py-2 text-white rounded-md ${
            newPasswordError || confirmPasswordError
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-black hover:bg-slate-900"
          } transition duration-300`}
          onClick={handleChangePassword}
          disabled={!!newPasswordError || !!confirmPasswordError}
        >
          Change Password
        </button>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirm Password Change</DialogTitle>
              <DialogDescription>
                Are you sure you want to change your password? This action
                cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={confirmPasswordChange}>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
export default ProfileChangePasswordSection;
