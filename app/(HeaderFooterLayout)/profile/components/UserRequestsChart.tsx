"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);

const options = {
  responsive: true,
  tension: 0.4,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

const UserRequestsChart = ({ requests }: { requests: any }) => {
  const labels = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  //sort the labels as current month to be the last
  const currentMonth = new Date().getMonth();
  const sortedLabels = labels
    .slice(currentMonth + 1)
    .concat(labels.slice(0, currentMonth + 1));

  //add no of requests per month
  const values = new Array(12).fill(0);
  requests.forEach((request: any) => {
    const date = new Date(request.bloodNeededOn.split("T")[0]);
    values[date.getMonth()] += 1;
  });

  //sort the values as the same order of labels
  const sortedValues = values
    .slice(currentMonth + 1)
    .concat(values.slice(0, currentMonth + 1));

  const newLabels = sortedLabels.filter((_, ind) => sortedValues[ind] !== 0);

  const newValues = sortedValues.filter((val) => val !== 0);

  const data = {
    labels: newLabels,
    datasets: [
      {
        label: "",
        data: newLabels.map((_, ind) => newValues[ind]),
        borderColor: "#BF372A",
        backgroundColor: "#DF372A",
      },
    ],
  };

  return (
    <div className="flex flex-col justify-between w-full md:!w-[90%] mx-auto relative">
      <h3 className="text-black font-RobotoBold text-base md:!text-xl mb-2 md:!mb-4 capitalize">
        Blood Requests
      </h3>
      <Line options={options} data={data} />
    </div>
  );
};

export default UserRequestsChart;
