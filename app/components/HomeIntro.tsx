"use client"

import React from "react";
import Image from "next/image";
import homeIntro from "@/assets/homeIntro.png";
import homeIntro2 from "@/assets/homeIntro2.png";
import { Button } from "@/components/ui/button";
import cx from "classnames";
import { useRouter } from "next/navigation";
import { useBBSelector } from "@/redux/store";

const HomeIntro = ({ isSecondImage }: { isSecondImage?: boolean }) => {
  const { push } = useRouter();
  const auth = useBBSelector((state) => state.authReducer.value.isAuth);

  const handleRequestDonate = () => {
    if(auth) {
      push("/blood-banks");
    } else {
      push("/auth/signIn");
    }
  }
  return (
    <div
      className={cx(
        "w-full flex items-end flex-col-reverse md:!flex-row pl-[6%] pr-[3%] mt-12 gap-x-4 2xl:!pr-[6%] 2xl:!justify-between",
        { "mb-6 md:!mb-1 !items-center !gap-x-8": isSecondImage },
      )}
    >
      <div
        className={cx(
          "w-full md:!w-2/5 flex flex-col gap-y-3.5 mt-5 md:!mt-0 2xl:!w-[45%]",
          { "md:!w-2/6 2xl:!w-2/6": isSecondImage },
        )}
      >
        <h1 className="text-2xl md:!text-4xl capitalize font-PlayfairDisplayMedium italic">
          Blood Bridge
        </h1>
        <p className="text-sm lg:!text-base font-LatoRegular text-neutral-800">
          Welcome to Blood Bridge, where we bridge the gap between blood donors
          and those in need. Our platform connects you with people who require
          blood transfusions and gives you the opportunity to make a life-saving
          difference. Whether you are a donor or in need, Blood Bridge makes the
          process simple and convenient.
        </p>
        <div className="flex items-center gap-x-3">
          <Button
            onClick={handleRequestDonate}
            variant={"outline"}
            className="!py-1 !pr-0 !h-auto uppercase tracking-[5px] !rounded-full !border-2 !border-red-700 hover:!bg-red-700 hover:!text-white min-w-[100px] md:!min-w-[108px] lg:!min-w-[120px] font-DMSansMedium focus:!ring-0 text-xs md:!text-sm lg:!text-base !pl-1"
          >
            Request
          </Button>
          <Button
            onClick={handleRequestDonate}
            variant={"outline"}
            className="!py-1 !pr-0 !h-auto uppercase tracking-[5px] !rounded-full !border-2 !border-red-700 hover:!bg-red-700 hover:!text-white min-w-[100px] md:!min-w-[108px] lg:!min-w-[120px] font-DMSansMedium focus:!ring-0 text-xs md:!text-sm lg:!text-base !pl-1"
          >
            Donate
          </Button>
        </div>
      </div>
      {!isSecondImage && (
        <div className="w-full md:!w-3/5 2xl:!w-1/2">
          <Image
            className="w-full object-cover"
            src={homeIntro}
            alt="Home Intro"
          />
        </div>
      )}
      {isSecondImage && (
        <div className="w-4/6 hidden md:!flex items-center justify-between">
          <div className="w-1/2">
            <Image
              className="w-full object-cover"
              src={homeIntro}
              alt="Home Intro"
            />
          </div>
          <div className="w-[45%]">
            <Image
              className="w-full object-cover"
              src={homeIntro2}
              alt="Home Intro"
            />
          </div>
        </div>
      )}
      {isSecondImage && (
        <div className="flex md:!hidden items-center justify-between">
          <div className="w-1/2">
            <Image
              className="w-full object-cover"
              src={homeIntro}
              alt="Home Intro"
            />
          </div>
          <div className="w-[45%]">
            <Image
              className="w-full object-cover"
              src={homeIntro2}
              alt="Home Intro"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeIntro;
