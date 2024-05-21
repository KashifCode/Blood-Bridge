import React from "react";
import BloodTypesChart from "./BloodTypesChart";
import BBDashboardUsers from "./BBDashboardUsers";

const Dashboardviewer = () => {
  const selectedMonth = new Date().getMonth() + 1;
  const monthName = new Date().toLocaleString("default", { month: "long" });

  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-centre mb-4">
        <p className="font-DMSansSemiBold text-xl text-slate-900 capitalize">
          Blood Consumed
        </p>
        <p className="font-DMSansMedium text-xl text-slate-900 capitalize">
          {monthName}
        </p>
      </div>
      <BloodTypesChart selectedMonth={selectedMonth}/>
      <BBDashboardUsers />
    </div>
  );
};

export default Dashboardviewer;
