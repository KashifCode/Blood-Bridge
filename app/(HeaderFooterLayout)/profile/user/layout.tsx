import React from "react";
import UserInfo from "@/app/(HeaderFooterLayout)/profile/components/UserInfo";
import MobileLayout from "../components/MobileLayout";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="hidden md:!flex w-full pl-[6.5%] pr-[3%] mt-10 items-start gap-x-5">
        <UserInfo />
        <div className="w-[70%]">{children}</div>
      </div>
      <div className="block mt-8 md:!hidden"><MobileLayout>{children}</MobileLayout></div>
    </>
  );
};

export default layout;
