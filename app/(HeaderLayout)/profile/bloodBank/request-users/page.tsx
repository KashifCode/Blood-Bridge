import React from "react";
import RequestUsersViewer from "@/app/(HeaderLayout)/profile/components/RequestUsersViewer";
import shadow from "@/app/components/shadow.module.css";

const page = () => {
  return (
    <div
      className={`w-full bg-stone-50 pl-[5%] pr-[10%] pt-6 relative ${shadow.bloodBankNavHeight}`}
    >
      <RequestUsersViewer />
    </div>
  );
};

export default page;
