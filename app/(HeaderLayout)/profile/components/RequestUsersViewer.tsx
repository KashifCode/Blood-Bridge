"use client";

import React, { useState } from "react";
import BloodTypesChart from "./BloodTypesChart";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import ViewLists from "@/globals/icons/view-lists";
import PastLists from "@/globals/icons/past-lists";

const RequestUsersViewer = () => {
  const { push } = useRouter();
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth() + 1,
  );
  const options = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleRedirect = (path: string) => {
    push(path);
  };

  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-centre mb-4">
        <p className="font-DMSansSemiBold text-xl text-slate-900 capitalize">
          Blood Consumed
        </p>
        <select
          className="outline-0 border-none focus:border-none focus:outline-0 bg-red-700 text-white p-1 rounded-lg"
          defaultValue={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
        >
          {options.map((option: string, index: number) => (
            <option key={index} value={index + 1}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <BloodTypesChart selectedMonth={selectedMonth} />
      <div>
        <div className="w-max flex flex-col gap-y-5 mt-6 mb-3">
          <div
            className="w-full bg-[#E3E3E3] rounded-[10px] py-5 flex gap-x-32 items-center justify-between px-6 cursor-pointer"
            onClick={() =>
              handleRedirect("/profile/bloodBank/request-users/new-request")
            }
          >
            <div className="flex gap-x-3 items-center">
              <ViewLists />
              <p className="text-[#000022] font-LatoBold text-lg">
                Place New Request
              </p>
            </div>
            <ChevronRight size={24} color={"black"} />
          </div>
          <div
            className="w-full bg-[#E3E3E3] rounded-[10px] py-5 flex gap-x-32 items-center justify-between px-6 cursor-pointer"
            onClick={() =>
              handleRedirect("/profile/bloodBank/request-users/past-requests")
            }
          >
            <div className="flex gap-x-3 items-center">
              <PastLists />
              <p className="text-[#000022] font-LatoBold text-lg">
                View Past Requests
              </p>
            </div>
            <ChevronRight size={24} color={"black"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestUsersViewer;
