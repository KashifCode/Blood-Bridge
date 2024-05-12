import React from "react";
import Image from "next/image";
import shadow from "@/app/components/shadow.module.css";
import cx from "classnames";

const BloodBankCard = ({ bloodBank }: { bloodBank: any }) => {
  return (
    <div
      className={`w-4/5 mx-auto sm:mx-0 sm:w-full bg-white flex flex-col lg:h-[72vh] xl:h-[59vh] relative ${shadow.lightShadow}`}
    >
      <div className={cx("absolute right-2.5 top-2.5 rounded-3xl bg-darkRed", {'!bg-green-700': bloodBank?.status === "open"})}>
        <p className="text-white font-semibold pt-0.5 pb-1 px-3">{bloodBank?.status}</p>
      </div>
      
      <Image
        className="!w-full h-[40vh] object-contain"
        src={bloodBank?.avatar}
        alt="Blood Bank Logo"
        width={1500}
        height={1500}
      />
      <div className="w-full flex flex-col items-start px-4 pb-5 gap-y-0.5 pt-5">
        <h3 className="text-black text-xl font-PlayfairDisplaySemiBold">
          {bloodBank?.name}
        </h3>
        <p className="text-black font-PlayfairDisplaySemiBold">
          {bloodBank?.address}
        </p>
        <p className="text-black font-PlayfairDisplaySemiBold">
          {bloodBank?.contact}
        </p>
        <p className="text-black font-PlayfairDisplaySemiBold">
          {bloodBank?.sector}
        </p>
        <p className="text-black font-PlayfairDisplaySemiBold">
          {bloodBank?.location?.coordinates?.[0]}, {bloodBank?.location?.coordinates?.[1]}
        </p>
      </div>
    </div>
  );
};

export default BloodBankCard;
