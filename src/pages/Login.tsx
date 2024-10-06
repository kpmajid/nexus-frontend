import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { AppDispatch, RootState } from "../app/store";
import { loginFulfilled } from "@/app/features/auth/authSlice";

import { login } from "@/apis/authApi";
import resendOTP from "@/apis/resendOTP";

import { isEmail, isPasswordStrong } from "@/util/formValidations";

import LoadingSpinner from "../components/LoadingSpinner";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormErrors {
  email?: string;
  password?: string;
}

const validateField = (
  field: keyof LoginFormErrors,
  value: string,
  validationFunc: (value: string) => string | undefined,
  errors: LoginFormErrors
) => {
  const error = validationFunc(value);
  if (error) {
    errors[field] = error;
  } else {
    delete errors[field];
  }
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/projects");
    }
  }, [isLoggedIn, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    const validationErrors = { ...errors };
    switch (id) {
      case "email":
        validateField("email", value, isEmail, validationErrors);
        break;
      case "password":
        validateField("password", value, isPasswordStrong, validationErrors);
        break;
      default:
        break;
    }
    setErrors(validationErrors);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const validationErrors: LoginFormErrors = {};

    validateField("email", formData.email, isEmail, validationErrors);
    validateField(
      "password",
      formData.password,
      isPasswordStrong,
      validationErrors
    );

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setIsLoading(true);

      try {
        const response = await login(formData);
        if (response && response.data) {
          console.log(response.data);
          const { id, name, email, avatar } = response.data;
          dispatch(loginFulfilled({ id, name, email, avatar }));

          toast.success("Login successful!");
          navigate("/projects");
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error.message);
          if (error.message === "email not verified") {
            try {
              toast.info("Resending OTP...");
              await resendOTP(formData.email);
              setTimeout(() => {
                navigate("/verify-email", {
                  state: { userEmail: formData.email },
                });
              }, 2000);
            } catch (otpError: unknown) {
              if (otpError instanceof Error) {
                toast.error(otpError.message);
              }
            }
          }
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isLoggedIn === undefined) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-8 relative">
      <div className="mx-auto flex flex-col items-center gap-2 px-4 py-8 md:py-12 md:pb-8 lg:py-12 lg:pb-10">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-center text-2xl font-bold">
            Welcome back to Nexus
          </h2>
          <p className="text-center text-gray-500">
            Please enter data to log in
          </p>
          <form className="space-y-4 my-4">
            <div>
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            <div className="text-center">
              <Link
                to="/forgot-password"
                className="text-black font-semibold underline"
              >
                Forgot Password?
              </Link>
            </div>
            <button
              className="w-full py-2 text-white bg-black rounded"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Loging In..." : "Log In"}
            </button>
          </form>
          <p className="text-center text-gray-500">
            Don’t have an account?{" "}
            <Link to="/register" className="text-black font-semibold underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
