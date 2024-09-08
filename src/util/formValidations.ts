const isName = (value: string): string | undefined => {
  if (!value.trim()) {
    return "Name is required";
  }

  const namePattern = /^[a-zA-Z\s]+$/;
  if (!namePattern.test(value)) {
    return "Name must contain only letters and spaces";
  }

  return undefined;
};

const isEmail = (value: string): string | undefined => {
  if (!value.trim()) {
    return "Email is required";
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(value) ? undefined : "Invalid email address";
};

const isPasswordStrong = (value: string): string | undefined => {
  if (!value.trim()) {
    return "Password is required";
  }
  if (value.length < 8) {
    return "Password must be at least 8 characters long.";
  }
  if (!/[A-Z]/.test(value)) {
    return "Password must contain at least one uppercase letter.";
  }
  if (!/[a-z]/.test(value)) {
    return "Password must contain at least one lowercase letter.";
  }
  if (!/\d/.test(value)) {
    return "Password must contain at least one digit.";
  }
  if (!/[@$!%*?&]/.test(value)) {
    return "Password must contain at least one special character (e.g., @$!%*?&).";
  }

  return undefined;
};

const doPasswordsMatch = (
  password: string,
  confirmPassword: string
): string | undefined => {
  if (!password.trim()) {
    return "Confirm Password is required";
  }
  return password === confirmPassword ? undefined : "Passwords do not match";
};

export { isName, isEmail, isPasswordStrong, doPasswordsMatch };
