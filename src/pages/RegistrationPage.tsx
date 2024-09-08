import { useState } from "react";

import RegistrationForm from "../components/RegistrationForm";
import OTPVerificationForm from "../components/OTPVerificationForm";

const RegistrationPage: React.FC = () => {
  const [isOtpSent, setIsOtpSent] = useState<boolean>(true);

  return (
    <div className="container mx-auto px-8 relative">
      <div className="mx-auto flex flex-col items-center gap-2 px-4 py-8 md:py-12 md:pb-8 lg:py-12 lg:pb-10">
        {isOtpSent ? (
          <OTPVerificationForm />
        ) : (
          <RegistrationForm setIsOtpSent={setIsOtpSent} />
        )}
      </div>
    </div>
  );
};

export default RegistrationPage;
