import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { RootState } from "@/app/store";

import {
  isName,
  isEmail,
  isPasswordStrong,
  doPasswordsMatch,
} from "../util/formValidations";
import api from "@/apis/axiosInstance";
import LoadingSpinner from "@/components/LoadingSpinner";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterFormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const validateField = (
  field: keyof RegisterFormErrors,
  value: string,
  validationFunc: (value: string) => string | undefined,
  errors: RegisterFormErrors
) => {
  const error = validationFunc(value);
  if (error) {
    errors[field] = error;
  } else {
    delete errors[field];
  }
};

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<RegisterFormErrors>({});
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
      case "name":
        validateField("name", value, isName, validationErrors);
        break;
      case "email":
        validateField("email", value, isEmail, validationErrors);
        break;
      case "password":
        validateField("password", value, isPasswordStrong, validationErrors);
        break;
      case "confirmPassword":
        validateField(
          "confirmPassword",
          value,
          (val) => doPasswordsMatch(formData.password, val),
          validationErrors
        );
        break;
      default:
        break;
    }
    setErrors(validationErrors);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const validationErrors: RegisterFormErrors = {};

    validateField("name", formData.name, isName, validationErrors);
    validateField("email", formData.email, isEmail, validationErrors);
    validateField(
      "password",
      formData.password,
      isPasswordStrong,
      validationErrors
    );
    validateField(
      "confirmPassword",
      formData.confirmPassword,
      (value) => doPasswordsMatch(formData.password, value),
      validationErrors
    );

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setIsLoading(true);
      try {
        await api.post("/auth/register", formData);
        toast.success("Check you mail for OTP,");

        navigate("/verify-email", { state: { userEmail: formData.email } });
      } catch (error) {
        toast.error(error?.response?.data.message || "Registration failed");
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
          <h2 className="text-center text-2xl font-bold">Create an account</h2>
          <p className="text-center text-gray-500">Let’s create your account</p>
          <form className="space-y-4 my-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="border  rounded-md p-2  w-full focus:outline-none"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="border rounded-md p-2 w-full focus:outline-none "
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="border rounded-md p-2 w-full focus:outline-none"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="border rounded-md p-2 w-full focus:outline-none "
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
              )}
            </div>
            <button
              type="button"
              className="w-full py-2 text-white bg-black rounded"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
          <p className="text-center text-gray-500">
            Already a member?{" "}
            <Link to="/login" className="text-black font-semibold underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
