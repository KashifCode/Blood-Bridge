"use client";
import { updateUser, notFound, updateJustLoggedOut } from "@/redux/features/authSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { axiosInstance as axios } from "@/app/axios-api/axios";
import {
  getUserDetailsUrl,
  getBloodBankDetailsUrl,
} from "@/app/axios-api/Endpoint";
import storageHelper from "@/lib/storage-helper";
import { useBBSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";

const EnsureLogin = () => {
  const dispatch = useDispatch();
  const { push } = useRouter();
  const [emailVerified, setEmailVerified] = useState<boolean>(true);
  const pathname = usePathname();

  useEffect(() => {
    const reloadData = async () => {
      let user: any = null;
      const role = await storageHelper.getItem(storageHelper.StorageKeys.Role);
      const url =
        role === "user" || role === "admin"
          ? getUserDetailsUrl()
          : role === "bloodBank"
            ? getBloodBankDetailsUrl()
            : "";
      if (url !== "") {
        axios
          .get(url, {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            user = role === "user" || role === "admin" ? res.data.user : res.data.bloodBank;
            setEmailVerified(user.emailVerified);
            dispatch(updateUser({ user } as any));
          })
          .catch(() => {
            dispatch(notFound());
          });
      } else {
        dispatch(notFound());
      }
    };
    reloadData();
  }, [dispatch]);

  const isLoading = useBBSelector((state) => state.authReducer.value.isLoading);
  const loggedInUser = useBBSelector((state) => state.authReducer.value.user);
  const justLoggedOut = useBBSelector((state) => state.authReducer.value.justLoggedOut)

  useEffect(() => {
    const userRoutes = [
      "/",
      "/auth/signIn",
      "/auth/signUp",
      "/auth/forgot-password",
      "/auth/user/reset/:token",
      "/auth/forgot-password",
      "/:user/:id/verify/:token",
      "/blood-banks",
      "/blood-banks/donate-blood",
      "/blood-banks/request-blood",
      "/event",
      "/reviews",
      "/profile/user",
      "/profile/user/dashboard",
      "/profile/user/requests",
      "/profile/user/donations",
      "/profile/user/account",
      "/profile/user/feedback",
    ]

    const bloodBankRoutes = [
      "/",
      "/auth/signIn",
      "/auth/signUp",
      "/auth/forgot-password",
      "/auth/user/reset/:token",
      "/auth/forgot-password",
      "/:user/:id/verify/:token",
      "/profile/bloodBank/dashboard",
      "/profile/bloodBank/users",
      "/profile/bloodBank/requests",
      "/profile/bloodBank/events",
      "/profile/bloodBank/blood",
      "/profile/bloodBank/donation",
      "/profile/bloodBank/donation/manual",
      "/profile/bloodBank/types-blood",
      "/profile/bloodBank/reviews",
      "/profile/bloodBank/settings/management",
      "/profile/bloodBank/settings/policy",
      "/profile/bloodBank/request-users",
      "/profile/bloodBank/request-users/new-request",
      "/profile/bloodBank/request-users/past-requests",
    ]

    const adminRoutes = [
      "/",
      "/auth/signIn",
      "/auth/signUp",
      "/auth/forgot-password",
      "/auth/user/reset/:token",
      "/auth/forgot-password",
      "/admin/dashboard",
      "/admin/users",
      "/admin/users/:id",
      "/admin/users/blocked",
      "/admin/bloodBanks",
      "/admin/bloodBanks/:id",
      "/admin/bloodBanks/blocked",
      "/admin/events",
      "/admin/events/records",
      "/admin/donations",
      "/admin/requests",
    ]

    const routesWithNoAuth = [
      "/",
      "/auth/signIn",
      "/auth/signUp",
      "/auth/forgot-password",
      "/auth/user/reset/:token",
      "/auth/forgot-password",
    ]

    if (routesWithNoAuth.includes(pathname)) {
      return;
    } else {
      if (!justLoggedOut) {
        if (!(routesWithNoAuth.includes(pathname)) && loggedInUser === null && !isLoading) {
          toast.error("You are not authorized to access this page");
          push("/");
        }
        if (!(userRoutes.includes(pathname)) && loggedInUser?.role === "user" && !isLoading) {
          toast.error("You are not authorized to access this page");
          push("/");
        }
        if (!(bloodBankRoutes.includes(pathname)) && loggedInUser?.role === "bloodBank" && !isLoading) {
          toast.error("You are not authorized to access this page");
          push("/");
        }
        if (!(adminRoutes.includes(pathname)) && loggedInUser?.role === "admin" && !isLoading) {
          toast.error("You are not authorized to access this page");
          push("/");
        }
      } else {
        dispatch(updateJustLoggedOut());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, push, isLoading, loggedInUser, dispatch]);

  useEffect(() => {
    if (loggedInUser?.role === "bloodBank") {
      if (loggedInUser) {
        if (!loggedInUser.profileVerified) {
          push("/profile/bloodBank/settings/management");
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <>
      {((emailVerified === false) && !isLoading) ?
        <div className="w-screen h-8 flex items-center justify-center bg-darkRed -mb-3">
          <p className="text-white font-DMSansSemiBold">Please verify your email address</p>
        </div> :
        <></>
      }
    </>
  )
}

export default EnsureLogin;
