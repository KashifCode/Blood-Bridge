"use client";

import React, { useState, useEffect } from "react";
import { axiosInstance as axios } from "@/app/axios-api/axios";
import { BBgetAllBloodTypes } from "@/app/axios-api/Endpoint";
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

const BloodTypesChart = ({ selectedMonth }: { selectedMonth: number }) => {
  const [bloodTypes, setBloodTypes] = useState<any[]>([]);

  const filterStockHistory = (bloodType: any[]): any[] => {
    if (!bloodType) return [];

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    let allEntriesDates: any[] = [];
    bloodType.map((stockHistory: any) => {
      const allDates = stockHistory.stockHistory.map((stockHistory: any) => {
        return stockHistory.createdAt.split("T")[0];
      });
      allEntriesDates.push(...allDates);
    });

    //remove dates that are not in the selected month
    allEntriesDates = allEntriesDates.filter((date: any) => {
      const [year, month, day] = date.split("-");
      return +month === selectedMonth && +year === currentDate.getFullYear();
    });

    //add the 1st of current month (2 digit) and current date to the array
    allEntriesDates.push(
      `${currentDate.getFullYear()}-${currentMonth.toString().padStart(2, "0")}-1`,
    );
    allEntriesDates.push(
      `${currentDate.getFullYear()}-${currentMonth.toString().padStart(2, "0")}-${currentDay}`,
    );

    //sort the dates
    allEntriesDates = allEntriesDates.sort(
      (a: any, b: any) => new Date(a).getTime() - new Date(b).getTime(),
    );
    //remove duplicates
    allEntriesDates = Array.from(new Set(allEntriesDates));

    //for each date, list stock history for each blood type
    const bloodTypeStock = allEntriesDates.map((date: any) => {
      let stockEveryDate: any = [];
      bloodType.forEach((bloodTypeData: any) => {
        //if the date is the current date, add the stock for the current date
        if (date.split("-")[2] == currentDate.getDate()) {
          stockEveryDate.push({
            stock: bloodTypeData.stock,
            date,
            bloodGroup: bloodTypeData.bloodGroup,
          });
          return;
        }
        if (date.split("-")[2] == 1) {
          const lastStockData = bloodTypeData.stockHistory.filter(
            (stockHistory: any) => {
              const date = new Date(stockHistory.createdAt.split("T")[0]);
              return date.getMonth() + 1 !== currentMonth;
            },
          );

          const lastStock = lastStockData[lastStockData.length - 1]?.stock || 0;
          stockEveryDate.push({
            stock: lastStock,
            date,
            bloodGroup: bloodTypeData.bloodGroup,
          });
          return;
        }
        let found = false;
        let foundItem: any = {};
        for (let i = 0; i < bloodTypeData.stockHistory.length; i++) {
          const stockHistoryItem = bloodTypeData.stockHistory[i];
          if (stockHistoryItem.createdAt.split("T")[0] === date) {
            stockEveryDate.push({
              stock: stockHistoryItem?.stock,
              date,
              bloodGroup: bloodTypeData.bloodGroup,
              abc: "true",
            });
            found = true;
            break; // Exit the loop once a matching date is found
          } else if (stockHistoryItem.createdAt.split("T")[0] < date) {
            foundItem = stockHistoryItem;
          } else {
          }
        }
        if (!found && foundItem) {
          stockEveryDate.push({
            stock: foundItem?.stock,
            date,
            bloodGroup: bloodTypeData.bloodGroup,
          });
          found = true;
        }
      });

      return stockEveryDate;
    });
    setBloodTypes(bloodTypeStock);

    return bloodTypeStock;
  };

  useEffect(() => {
    const url = BBgetAllBloodTypes();
    axios
      .get(url, {
        withCredentials: true,
      })
      .then((res) => {
        filterStockHistory(res.data.bloodTypes);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const daysArr = bloodTypes.map((bloodType: any[]) =>
    new Date(bloodType.map((val: any) => val.date)[0]).getDate(),
  );

  const data = {
    labels: daysArr,
    datasets: [
      {
        label: "A+",
        data: bloodTypes.map(
          (bloodType: any[]) =>
            bloodType.filter((val: any) => val.bloodGroup === "A+")[0]?.stock,
        ),
        borderColor: "#BF372A",
        backgroundColor: "#DF372A",
      },
      {
        label: "A-",
        data: bloodTypes.map(
          (bloodType: any[]) =>
            bloodType.filter((val: any) => val.bloodGroup === "A-")[0]?.stock,
        ),
        borderColor: "#1F78B4",
        backgroundColor: "#1F78D4",
      },
      {
        label: "AB+",
        data: bloodTypes.map(
          (bloodType: any[]) =>
            bloodType.filter((val: any) => val.bloodGroup === "AB+")[0]?.stock,
        ),
        borderColor: "#33A02C",
        backgroundColor: "#33C02C",
      },
      {
        label: "AB-",
        data: bloodTypes.map(
          (bloodType: any[]) =>
            bloodType.filter((val: any) => val.bloodGroup === "AB-")[0]?.stock,
        ),
        borderColor: "#FB9A99",
        backgroundColor: "#FF9A99",
      },
      {
        label: "O+",
        data: bloodTypes.map(
          (bloodType: any[]) =>
            bloodType.filter((val: any) => val.bloodGroup === "O+")[0]?.stock,
        ),
        borderColor: "#A6CEE3",
        backgroundColor: "#A6CEFF",
      },
      {
        label: "O-",
        data: bloodTypes.map(
          (bloodType: any[]) =>
            bloodType.filter((val: any) => val.bloodGroup === "O-")[0]?.stock,
        ),
        borderColor: "#B2DF8A",
        backgroundColor: "#B2EF8A",
      },
      {
        label: "B+",
        data: bloodTypes.map(
          (bloodType: any[]) =>
            bloodType.filter((val: any) => val.bloodGroup === "B+")[0]?.stock,
        ),
        borderColor: "#5E4D8A",
        backgroundColor: "#5E4DAA",
      },
      {
        label: "B-",
        data: bloodTypes.map(
          (bloodType: any[]) =>
            bloodType.filter((val: any) => val.bloodGroup === "B-")[0]?.stock,
        ),
        borderColor: "#003E5A",
        backgroundColor: "#003E7A",
      },
    ],
  };

  return (
    <div className="w-3/4 mx-auto relative">
      <Line options={options} data={data} />
    </div>
  );
};

export default BloodTypesChart;
