const OtpVerification = () => {
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
                type="email"
                placeholder="Enter your email address"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <button className="w-full py-2 text-white bg-black rounded">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default OtpVerification