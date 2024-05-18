import React from "react";
import shadow from "@/app/components/shadow.module.css";
import ForgotPassword from "@/app/auth/components/ForgotPassword";

const page = () => {
  return (
    <div
      className={`'w-full mt-12 sm:!mt-8 relative z-[3] min-h-[60vh] sm:!min-h-[68vh] md:!min-h-[76vh] bg-white flex items-center justify-center ${shadow.lightShadow}`}
    >
      <ForgotPassword />
    </div>
  );
};

export default page;
