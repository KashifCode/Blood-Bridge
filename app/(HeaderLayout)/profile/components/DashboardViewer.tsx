"use client";

import React, { useState } from "react";
import BloodTypesChart from "./BloodTypesChart";
import BBDashboardUsers from "./BBDashboardUsers";

const Dashboardviewer = () => {
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
      <BBDashboardUsers />
    </div>
  );
};

export default Dashboardviewer;
