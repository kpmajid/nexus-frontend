import { toast } from "react-toastify";

import { resetPassword } from "@/apis/authApi";
import useAuth from "@/hooks/useAuth";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAuth();
  const [email, setEmail] = useState("");
  const [validationError, setValidationError] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait for isLoggedIn to be determined
    if (isLoggedIn !== undefined) {
      setLoading(false);
      if (isLoggedIn) {
        navigate("/projects");
      }
    }
  }, [isLoggedIn, navigate]);

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

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const error = validateEmail(email);
    if (error) {
      setValidationError(error);
      return;
    }
    try {
      const result = await resetPassword(email);
      if (result?.success) {
        console.log("sucess");
        toast.success("Check your Email!");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setValidationError("Failed to update name. Please try again.");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  if (loading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-8 relative">
      <div className="mx-auto flex flex-col items-center gap-2 px-4 py-8 md:py-12 md:pb-8 lg:py-12 lg:pb-10">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h2 className="text-center text-2xl font-bold">Forgot password?</h2>
          <p className="text-center text-gray-500">
            Enter your email and we’ll send you a link to reset your password.
          </p>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                value={email}
                onChange={handleEmailChange}
                type="email"
                placeholder="Enter your email address"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
              />
              {validationError && (
                <p className="text-red-500 text-sm mt-1">{validationError}</p>
              )}
            </div>
            <button
              className={`${
                validationError
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-black hover:bg-slate-900"
              } text-white rounded-md px-4 py-2 transition duration-300`}
              type="button"
              onClick={handleSubmit}
              disabled={!!validationError}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
