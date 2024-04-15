import React from "react";
import shadow from "@/app/components/shadow.module.css";
import SettingsLayout from "@/app/(HeaderFooterLayout)/profile/components/SettingsLayout";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={`w-full bg-stone-200 pl-[5%] pr-[10%] pt-8 relative ${shadow.bloodBankNavHeight}`}
    >
      <p className="font-LatoBold mb-[1.125rem] text-2xl text-slate-900">
        Settings
      </p>
      <div className="w-full flex justify-between">
        <div className="w-[35%]">
          <SettingsLayout />
        </div>
        <div className="w-[47%]">{children}</div>
      </div>
    </div>
  );
};

export default layout;
