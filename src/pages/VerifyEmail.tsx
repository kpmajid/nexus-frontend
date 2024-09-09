import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userEmail } = location.state;

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!userEmail.length) {
      navigate("/login");
    }
  }, [userEmail, navigate]);

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (!/^\d{6}$/.test(pastedData)) return;

    const newOtp = pastedData.split("");
    setOtp(newOtp);
    inputRefs.current[5]?.focus();
  };

  const handleResend = () => {};

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const enteredOTP = otp.join("");

    if (enteredOTP.length !== 6) {
      setError("Please enter all six digits of the OTP.");
      return;
    }

    try {
      console.log("FormData:", userEmail, enteredOTP);
      setIsLoading(true);

      const response = await axios.post(
        "http://localhost:3000/api/auth/verify-otp",
        { email: userEmail, otp: enteredOTP }
      );
      console.log("verification successful!", response.data);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Error verifiying:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-8 relative">
      <div className="mx-auto flex flex-col items-center gap-2 px-4 py-8 md:py-12 md:pb-8 lg:py-12 lg:pb-10">
        <div className="flex justify-center items-center bg-gray-100">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-2xl font-bold mb-4">Enter OTP</h2>
            <p className="mb-6 text-gray-600">
              {`Please enter the OTP we’ve sent to ${userEmail}`}
            </p>
            <form onSubmit={handleSubmit}>
              <div className="flex justify-end mb-2 text-sm">
                <button
                  type="button"
                  className="text-blue-500"
                  onClick={handleResend}
                >
                  Re-send Code
                </button>
              </div>
              <div className=" mb-6">
                <div className="flex flex-grow gap-2 justify-between">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(e.target.value, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      onPaste={handlePaste}
                      className="w-12 h-12 text-center text-xl border rounded-lg outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  ))}
                </div>
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-lg"
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Verify"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default VerifyEmail;
