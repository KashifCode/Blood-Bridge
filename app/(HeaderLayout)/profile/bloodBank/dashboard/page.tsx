import React from "react";
import shadow from "@/app/components/shadow.module.css";
import Dashboardviewer from "@/app/(HeaderLayout)/profile/components/DashboardViewer";

const page = () => {
  return (
    <div
      className={`w-full bg-stone-50 pl-[5%] pr-[10%] pt-6 relative ${shadow.bloodBankNavHeight}`}
    >
      <Dashboardviewer />
    </div>
  );
};

export default page;
