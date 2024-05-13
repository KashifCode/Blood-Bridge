import React from "react";
import UserDonationsMain from "@/app/(HeaderFooterLayout)/profile/components/UserDonationsMain";

const page = () => {
  return (
    <div className="w-full bg-[#F8F6F6] py-6 mb-4 rounded-[33px]">
      <div className="w-full px-1 md:!px-8">
        <UserDonationsMain />
      </div>
    </div>
  );
};

export default page;
