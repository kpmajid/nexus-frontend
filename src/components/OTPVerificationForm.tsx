import { useState } from "react";

const OTPVerificationForm = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));

  const handleChange = (value, index) => {
    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("OTP submitted: ", otp.join(""));
  };

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4">Enter OTP</h2>
        <p className="mb-6 text-gray-600">
          Please enter the OTP we’ve sent to example@gmail.com
        </p>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between mb-6">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"x
                value={data}
                onChange={(e) => handleChange(e.target.value, index)}
                className="w-12 h-12 text-center text-xl border rounded-lg outline-none focus:ring-2 focus:ring-indigo-600"
              />
            ))}
          </div>
          <div className="flex justify-between items-center mb-6">
            <button type="button" className="text-blue-500">
              Re-send Code
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};
export default OTPVerificationForm;
