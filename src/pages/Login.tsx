import { useState } from "react";
import { Link } from "react-router-dom";

import { isEmail, isPasswordStrong } from "@/util/formValidations";

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

const Login = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<LoginFormErrors>({});

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

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
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
      // Proceed with registration (e.g., API call)
      console.log("Login successful!", formData);
      // Reset form or redirect as needed
      setFormData({
        email: "",
        password: "",
      });
      setErrors({});
    }
  };

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
              <a
                href="/forgot-password"
                className="text-black font-semibold underline"
              >
                Forgot Password?
              </a>
            </div>
            <button
              className="w-full py-2 text-white bg-black rounded"
              onClick={handleSubmit}
            >
              Log In
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
