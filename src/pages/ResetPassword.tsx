import { toast } from "react-toastify";
import { resetPasswordWithToken } from "@/apis/authApi";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoadingSpinner from "@/components/LoadingSpinner";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);

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

  const validateConfirmPassword = (
    password: string,
    confirmPassword: string
  ) => {
    if (!password.trim()) {
      return "Confirm Password is required";
    }
    return password === confirmPassword ? "" : "Passwords do not match";
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError(validatePassword(newPassword));
    setConfirmPasswordError(
      validateConfirmPassword(newPassword, confirmPassword)
    );
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setConfirmPasswordError(
      validateConfirmPassword(password, newConfirmPassword)
    );
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const newPasswordError = validatePassword(password);
    const newConfirmPasswordError = validateConfirmPassword(
      password,
      confirmPassword
    );

    setPasswordError(newPasswordError);
    setConfirmPasswordError(newConfirmPasswordError);

    if (newPasswordError || newConfirmPasswordError) {
      return;
    }

    setLoading(true);
    try {
      const result = await resetPasswordWithToken(token!, password);
      if (result?.success) {
        //toast
        toast.success("Password updated successfully");

        setTimeout(() => navigate("/login"), 2000);
      } else {
        //toast
        toast.error("Somethign went wrong!");
      }
    } catch (err) {
      console.log(err);
      //toast
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-8 relative">
      <div className="mx-auto flex flex-col items-center gap-2 px-4 py-8 md:py-12 md:pb-8 lg:py-12 lg:pb-10">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h2 className="text-center text-2xl font-bold">
            Reset your password
          </h2>
          <p className="text-center text-gray-500">
            Please enter your new password below.
          </p>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700">New Password</label>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your new password"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
              />
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="Confirm your new password"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
              />
              {confirmPasswordError && (
                <p className="text-red-500 text-sm mt-1">
                  {confirmPasswordError}
                </p>
              )}
            </div>
            <button
              className={`${
                passwordError || confirmPasswordError
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-black hover:bg-slate-900"
              } text-white rounded-md px-4 py-2 transition duration-300`}
              type="button"
              onClick={handleSubmit}
              disabled={!!passwordError || !!confirmPasswordError}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ResetPassword;
