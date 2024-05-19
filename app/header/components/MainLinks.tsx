"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useBBSelector } from "@/redux/store";
import Link from "next/link";
import React from "react";
import { logOut } from "@/redux/features/authSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import ClientOnly from "@/app/components/ClientOnly";
import { BellDot, User } from "lucide-react";
import { useRouter } from "next/navigation";
import cx from "classnames";
import mapIcon from "@/assets/MapIcon.png";
import Image from "next/image";
import shadow from "@/app/components/shadow.module.css";
import LogoutIcon from "@/globals/icons/logout";
import storageHelper from "@/lib/storage-helper";
import { usePathname } from "next/navigation";
import { isMobile } from "react-device-detect";

const MainLinks = () => {
  const dispatch = useDispatch();
  const { push } = useRouter();
  const path = usePathname();
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleLogout = () => {
    // const url = logOutUserUrl();

    // axios.get(url, {
    //     withCredentials: true,
    // }).then((res) => {
    //     dispatch(logOut())
    //     push("/")
    //     toast.success(res.data.message);
    // }).catch((err) => {
    //     toast.error(err!.response!.data!.message!);
    // })
    dispatch(logOut());
    //get token from local storage if empty then show logout successful
    if (localStorage.getItem(storageHelper.StorageKeys.Access_Token) === null) {
      toast.success("Logout Successful");
      push("/");
    }
  };

  const isAuth = useBBSelector((state) => state.authReducer.value.isAuth);
  const isLoading = useBBSelector((state) => state.authReducer.value.isLoading);
  const user = useBBSelector((state) => state.authReducer.value.user);

  const handleProfile = () => {
    if (user.role === "bloodBank") {
      push("/profile/bloodBank/dashboard");
    } else if (user.role === "admin") {
      push("/admin/dashboard")
    } else {
      if(isMobile) {
        push("/profile/user");
      } else {
        push("/profile/user/donations");
      }
    }
    setShowDropdown(false);
  };

  return (
    <div
      className={cx("flex items-center justify-center", {
        "!gap-x-1 sm:!gap-x-1.5": user?.role === "bloodBank" || user?.role === "admin",
      }, {
        '!justify-end pr-3': isMobile && !isAuth
      })}
    >
      {(user?.role !== "bloodBank" && user?.role !== "admin" && isAuth) && (
        <>
          <Link href={"/blood-banks"}>
            <Button
              variant={"ghost"}
              className="!py-0 !px-1 !rounded-[3px] !h-auto flex items-center gap-x-1.5"
            >
              <Image
                className="!w-5 !h-5 object-contain"
                src={mapIcon}
                alt="Map Icon"
              />
              <p className="hidden sm:!block text-zinc-500 text-xs sm:!text-sm font-LatoRegular uppercase tracking-[2px]">
                locate
              </p>
            </Button>
          </Link>
          <div className="border-r-2 border-zinc-500 h-3 mx-2" />
          <Link href={"/blood-banks"}>
            <Button className="!bg-red-700 !bg-opacity-70 !py-0 !px-1 !rounded-[3px] !h-auto text-xs sm:!text-sm font-LatoRegular uppercase tracking-[2px]">
              Donate
            </Button>
          </Link>
          <div className="border-r-2 border-zinc-500 h-3 mx-2" />
          <Link href={"/blood-banks"}>
            <Button className="!bg-red-700 !bg-opacity-70 !py-0 !px-1 !rounded-[3px] !h-auto text-xs sm:!text-sm font-LatoRegular uppercase tracking-[2px]">
              Request
            </Button>
          </Link>
          <div className="border-r-2 border-zinc-500 h-3 mx-2" />
        </>
      )}
      {user?.role === "bloodBank" && (
        <div className="flex items-center gap-x-0.5">
          <div className="w-6 h-6 md:!w-7 md:!h-7 cursor-pointer" onClick={handleLogout}>
            <LogoutIcon svgClass="w-full h-full" />
          </div>
          <div className="cursor-pointer">
            <BellDot color="#ba5456" strokeWidth={1.4} size={isMobile ? "21": "24"} />
          </div>
        </div>
      )}
      {user?.role === "admin" && (
        <div className="flex items-center gap-x-0.5">
          <div className="w-6 h-6 md:!w-7 md:!h-7 cursor-pointer" onClick={handleLogout}>
            <LogoutIcon svgClass="w-full h-full" />
          </div>
        </div>
      )}
      <ClientOnly>
        {isLoading ? (
          <div className="w-5 h-5 border-t-2 border-zinc-500 rounded-full animate-spin" />
        ) : (
          <>
            {!isAuth ? (
              <>
                <Link href={"/auth/signIn"}>
                  <Button
                    variant={"ghost"}
                    className="!py-0 !px-1 !rounded-[3px] !h-auto text-xs sm:!text-sm font-LatoRegular uppercase tracking-[2px] !text-zinc-500"
                  >
                    Login
                  </Button>
                </Link>
              </>
            ) : (
              <div className="relative">
                <div className="flex items-center gap-x-1 sm:!gap-x-1.5">
                  <p
                    className={cx(
                      "text-black font-RobotoBold tracking-[2px] text-sm sm:text-base sm:tracking-[2.75px] uppercase",
                      {
                        "!font-LatoMedium !capitalize !tracking-normal w-max":
                          user.role === "bloodBank" || user.role === "admin",
                      },
                    )}
                  >
                    {user?.role === "user"
                      ? user.firstName.split(" ")[0]
                      : user?.role === "admin" ? user?.firstName + " " + user?.lastName : user.name
                    }
                  </p>
                  <div
                    className={cx("w-5 h-5 cursor-pointer", {
                      "!w-7 !h-7": user?.role === "bloodBank" || user?.role === "admin",
                    }, {
                      'mr-4': path.startsWith("/profile/bloodBank/") || path.startsWith("/admin/")
                    })}
                    onClick={
                      (user?.role === "bloodBank" || user?.role === "admin")
                        ? handleProfile
                        : () => setShowDropdown(!showDropdown)
                    }
                  >
                    {(user?.role === "bloodBank" || user?.role === "admin") ? (
                      <>
                        <Image
                          src={user.avatar}
                          alt="Profile"
                          className="!w-full !h-full object-cover rounded-full"
                          width={20}
                          height={20}
                        />
                      </>
                    ) : (
                      <>
                        {user?.avatar ? (
                          <>
                            <Image
                              src={user?.avatar}
                              alt="Profile"
                              className="!w-full !h-full object-cover rounded-full"
                              width={20}
                              height={20}
                            />
                          </>
                        ) : (
                          <User className="w-full h-full text-zinc-500" />
                        )}
                      </>
                    )}
                  </div>
                </div>
                <div
                  className={cx(
                    `rounded-[14px] py-2 bg-white min-w-[200px] absolute top-7 right-0 flex flex-col gap-y-1.5 overflow-hidden`,
                    { "!hidden": !showDropdown },
                    [shadow.lightShadow],
                  )}
                >
                  <Button
                    onClick={handleProfile}
                    variant={"ghost"}
                    className="!py-1 !px-1 !rounded-[3px] !h-auto text-xs sm:!text-sm font-LatoRegular uppercase tracking-[2px] !text-zinc-500"
                  >
                    Profile
                  </Button>
                  <Button
                    variant={"ghost"}
                    className="!py-1 !px-1 !rounded-[3px] !h-auto text-xs sm:!text-sm font-LatoRegular uppercase tracking-[2px] !text-zinc-500"
                    onClick={handleLogout}
                  >
                    LogOut
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </ClientOnly>
    </div>
  );
};

export default MainLinks;
