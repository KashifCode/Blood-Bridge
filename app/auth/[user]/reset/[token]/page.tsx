import React from "react";
import shadow from "@/app/components/shadow.module.css";
import ResetPasswordForm from "@/app/auth/components/ResetPasswordForm";

const page = () => {
  return (
    <div
      className={`'w-full mt-12 sm:!mt-8 relative z-[3] min-h-[62vh] sm:!min-h-[68vh] md:!min-h-[76vh] bg-white flex items-center justify-center ${shadow.lightShadow}`}
    >
      <ResetPasswordForm />
    </div>
  );
};

export default page;
