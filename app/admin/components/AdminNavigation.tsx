"use client";

import React from "react";
import shadow from "@/app/components/shadow.module.css";
import { usePathname } from "next/navigation";
import cx from "classnames";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { logOut } from "@/redux/features/authSlice";
import storageHelper from "@/lib/storage-helper";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const AdminNavigation = () => {
    const pathname = usePathname();
    const dispatch = useDispatch();
    const { push } = useRouter();

    const isAdmDashboard = pathname.startsWith("/admin/dashboard");
    const isAdmUsers = pathname.startsWith("/admin/users");
    const isAdmBloodBanks = pathname.startsWith("/admin/bloodBanks");
    const isAdmEvents = pathname.startsWith("/admin/events");
    const isAdmDonation = pathname.startsWith("/admin/donations");
    const isAdmRequests = pathname.startsWith("/admin/requests");
    const isAdmPolicies = pathname.startsWith("/admin/policies");

    const handleLogout = () => {
        dispatch(logOut());
        //get token from local storage if empty then show logout successful
        if (localStorage.getItem(storageHelper.StorageKeys.Access_Token) === null) {
            toast.success("Logout Successful");
            push("/");
        }
    };

    return (
        <div
            className={`w-full h-full flex flex-col gap-y-4 pt-4 ${shadow.lightShadow}`}
        >
            <Link href={"/admin/dashboard"}>
                <div className="w-full relative flex items-center gap-x-2 py-2 ps-5">
                    <div
                        className={cx(
                            "hidden absolute top-0 left-0 h-full border-l-[3px] border-bloodBankNavRed",
                            { "!block": isAdmDashboard },
                        )}
                    />
                    <p
                        className={cx("text-[#3F3F3F] font-LatoBold italic uppercase tracking-wider", {
                            "!text-bloodBankNavRed": isAdmDashboard,
                        })}
                    >
                        Dashboard
                    </p>
                </div>
            </Link>
            <Link href={"/admin/users"}>
                <div className="w-full relative flex items-center gap-x-2 py-2 ps-5">
                    <div
                        className={cx(
                            "hidden absolute top-0 left-0 h-full border-l-[3px] border-bloodBankNavRed",
                            { "!block": isAdmUsers },
                        )}
                    />
                    <p
                        className={cx("text-[#3F3F3F] font-LatoBold italic uppercase tracking-wider", {
                            "!text-bloodBankNavRed": isAdmUsers,
                        })}
                    >
                        Users
                    </p>
                </div>
            </Link>
            <Link href={"/admin/bloodBanks"}>
                <div className="w-full relative flex items-center gap-x-2 py-2 ps-5">
                    <div
                        className={cx(
                            "hidden absolute top-0 left-0 h-full border-l-[3px] border-bloodBankNavRed",
                            { "!block": isAdmBloodBanks },
                        )}
                    />
                    <p
                        className={cx("text-[#3F3F3F] font-LatoBold italic uppercase tracking-wider", {
                            "!text-bloodBankNavRed": isAdmBloodBanks,
                        })}
                    >
                        Blood Banks
                    </p>
                </div>
            </Link>
            <Link href={"/admin/events"}>
                <div className="w-full relative flex items-center gap-x-2 py-2 ps-5">
                    <div
                        className={cx(
                            "hidden absolute top-0 left-0 h-full border-l-[3px] border-bloodBankNavRed",
                            { "!block": isAdmEvents },
                        )}
                    />
                    <p
                        className={cx("text-[#3F3F3F] font-LatoBold italic uppercase tracking-wider", {
                            "!text-bloodBankNavRed": isAdmEvents,
                        })}
                    >
                        Events
                    </p>
                </div>
            </Link>
            <Link href={"/admin/donations"}>
                <div className="w-full relative flex items-center gap-x-2 py-2 ps-5">
                    <div
                        className={cx(
                            "hidden absolute top-0 left-0 h-full border-l-[3px] border-bloodBankNavRed",
                            { "!block": isAdmDonation },
                        )}
                    />
                    <p
                        className={cx("text-[#3F3F3F] font-LatoBold italic uppercase tracking-wider", {
                            "!text-bloodBankNavRed": isAdmDonation,
                        })}
                    >
                        Donations
                    </p>
                </div>
            </Link>
            <Link href={"/admin/requests"}>
                <div className="w-full relative flex items-center gap-x-1 py-2 ps-5">
                    <div
                        className={cx(
                            "hidden absolute top-0 left-0 h-full border-l-[3px] border-bloodBankNavRed",
                            { "!block": isAdmRequests },
                        )}
                    />
                    <p
                        className={cx("text-[#3F3F3F] font-LatoBold italic uppercase tracking-wider", {
                            "!text-bloodBankNavRed": isAdmRequests,
                        })}
                    >
                        Requests
                    </p>
                </div>
            </Link>
            <Link href={"/admin/policies"}>
                <div className="w-full relative flex items-center gap-x-2 py-2 ps-5">
                    <div
                        className={cx(
                            "hidden absolute top-0 left-0 h-full border-l-[3px] border-bloodBankNavRed",
                            { "!block": isAdmPolicies },
                        )}
                    />
                    <p
                        className={cx("text-[#3F3F3F] font-LatoBold italic uppercase tracking-wider", {
                            "!text-bloodBankNavRed": isAdmPolicies,
                        })}
                    >
                        Policies
                    </p>
                </div>
            </Link>

            <div className="w-full relative flex items-center gap-x-2 py-2 ps-5 cursor-pointer" onClick={handleLogout}>
                <p className="text-[#3F3F3F] font-LatoBold italic uppercase tracking-wider">
                    Logout
                </p>
            </div>
        </div>
    );
};

export default AdminNavigation