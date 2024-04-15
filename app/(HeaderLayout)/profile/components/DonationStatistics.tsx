"use client";

import React, { useState, useEffect } from "react";
import shadow from "@/app/components/shadow.module.css";
import { axiosInstance as axios } from "@/app/axios-api/axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BBUpdateDonationStatus,
  BBgetAllBloodDonations,
} from "@/app/axios-api/Endpoint";
import toast from "react-hot-toast";
import { X } from "lucide-react";
import cx from "classnames";

const DonationStatistics = () => {
  const [bloodDonations, setbloodDonations] = useState<any[]>();
  const [updateStatus, setUpdateStatus] = useState<{
    value: string;
    index: number;
  }>();
  const [message, setMessage] = useState<{ day: string; time: string }>({
    day: "",
    time: "",
  });
  const [showModal, setShowModal] = useState(false);

  const bloodTypes = ["All", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const monthOptions = [
    "All",
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
  const [selectedMonth, setSelectedMonth] = useState<string>(
    monthOptions[0].toLowerCase(),
  );
  const [selectedType, setSelectedType] = useState<string>(
    bloodTypes[0].toLowerCase(),
  );

  useEffect(() => {
    const url = BBgetAllBloodDonations();
    axios
      .get(url, {
        withCredentials: true,
      })
      .then((res) => {
        if (
          selectedMonth === "all" &&
          (selectedType === "All" || selectedType === "all")
        )
          return setbloodDonations(res.data.bloodDonations);
        if (selectedMonth === "all")
          return setbloodDonations(
            res.data.bloodDonations.filter(
              (donation: any) => donation.bloodGroup === selectedType,
            ),
          );
        if (selectedType === "All" || selectedType === "all")
          return setbloodDonations(
            res.data.bloodDonations.filter(
              (donation: any) =>
                new Date(donation.donationDate.split("T")[0])
                  .toLocaleString("default", { month: "short" })
                  .toLowerCase() === selectedMonth,
            ),
          );
        setbloodDonations(
          res.data.bloodDonations.filter(
            (donation: any) =>
              new Date(donation.donationDate.split("T")[0])
                .toLocaleString("default", { month: "short" })
                .toLowerCase() === selectedMonth &&
              donation.bloodGroup === selectedType,
          ),
        );
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.log(err);
      });
  }, [selectedMonth, selectedType]);

  const handleSubmitTime = () => {
    if (message.time === "" || message.day === "") {
      toast.error("Please select time to update");
      return;
    }
    handleUpdateStatus(updateStatus?.value!, updateStatus?.index!);
  };

  const handleUpdateStatus = (value: string, index: number) => {
    if (value === "") {
      return;
    }
    if (value === "Accepted" && message?.time === "" && message?.day === "") {
      setUpdateStatus({ value: value.split("T")[0], index });
      setShowModal(true);
      return;
    }
    const url = BBUpdateDonationStatus() + `${bloodDonations?.[index]._id}`;
    axios
      .put(
        url,
        { status: value, message },
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        toast.success("Status Updated Successfully");
        setbloodDonations((prev) => {
          let updatedRequests = [...prev!];
          updatedRequests[index].donationStatus = value as string;
          return updatedRequests;
        });
        setMessage({ day: "", time: "" });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };
  return (
    <div
      className={cx(
        "w-full bg-stone-50 pl-[2%] pr-[4%] pt-6 relative",
        { [shadow.bloodBankNavHeight]: !showModal },
        { "overflow-hidden": showModal },
        { [shadow.BBPanelScrollHeight]: showModal },
      )}
    >
      <p className="font-DMSansSemiBold mb-4 text-xl text-slate-900 capitalize">
        Blood Donation Statistics
      </p>
      <div className="w-full h-full">
        <div
          className={cx(
            "w-full bg-black bg-opacity-50 hidden justify-between items-center absolute top-0 left-0 z-10 h-full",
            { "!flex": showModal },
          )}
        >
          <div className="w-1/2 mx-auto h-[50vh] bg-white rounded-2xl relative pt-10 px-4">
            <X
              size={22}
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setShowModal(false)}
            />
            <p className="font-DMSansRegular text-black">
              Select Time for {bloodDonations?.[updateStatus?.index!]?.name} to
              visit for collection
            </p>
            <div className="flex flex-col gap-y-4 mt-3">
              <div className="flex flex-col gap-y-1">
                <p className="font-DMSansRegular text-black">Date</p>
                <input
                  type="date"
                  className="rounded-md border border-black border-opacity-10 outline-none p-1"
                  value={
                    bloodDonations?.[updateStatus?.index!]?.donationDate.split(
                      "T",
                    )[0]
                  }
                  readOnly
                />
              </div>
              <div className="flex flex-col gap-y-1">
                <p className="font-DMSansRegular text-black">Time</p>
                <input
                  type="time"
                  className="rounded-md border border-black border-opacity-10 outline-none p-1"
                  onChange={(e) =>
                    setMessage({
                      day: bloodDonations?.[
                        updateStatus?.index!
                      ].donationDate.split("T")[0],
                      time: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex justify-end">
                <button
                  className="bg-[#AC3E31] text-white font-DMSansRegular rounded-md px-4 py-1.5"
                  onClick={() => {
                    handleSubmitTime();
                    setShowModal(false);
                  }}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex gap-x-7 items-center">
          <div className="py-3 px-4 rounded-xl bg-[#20283E] min-w-[155px]">
            <h3 className="font-PlayfairDisplayBold capitalize text-white text-lg leading-5">
              Total Donations
            </h3>
            <h3 className="font-PlayfairDisplayBold capitalize text-white text-lg leading-5">
              {bloodDonations?.length}
            </h3>
          </div>
          <div className="py-3 px-4 rounded-xl bg-[#0A5620] min-w-[155px]">
            <h3 className="font-PlayfairDisplayBold capitalize text-white text-lg leading-5">
              Completed
            </h3>
            <h3 className="font-PlayfairDisplayBold capitalize text-white text-lg leading-5">
              {
                bloodDonations?.filter(
                  (donation) => donation.donationStatus === "Completed",
                ).length
              }
            </h3>
          </div>
          <div className="py-3 px-4 rounded-xl bg-[#55acce] min-w-[155px]">
            <h3 className="font-PlayfairDisplayBold capitalize text-white text-lg leading-5">
              Accepted
            </h3>
            <h3 className="font-PlayfairDisplayBold capitalize text-white text-lg leading-5">
              {
                bloodDonations?.filter(
                  (donation) => donation.donationStatus === "Accepted",
                ).length
              }
            </h3>
          </div>
          <div className="py-3 px-4 rounded-xl bg-[#B3C100] min-w-[155px]">
            <h3 className="font-PlayfairDisplayBold capitalize text-white text-lg leading-5">
              Pending
            </h3>
            <h3 className="font-PlayfairDisplayBold capitalize text-white text-lg leading-5">
              {
                bloodDonations?.filter(
                  (donation) => donation.donationStatus === "Pending",
                ).length
              }
            </h3>
          </div>
          <div className="py-3 px-4 rounded-xl bg-[#AC3E31] min-w-[155px]">
            <h3 className="font-PlayfairDisplayBold capitalize text-white text-lg leading-5">
              Rejected
            </h3>
            <h3 className="font-PlayfairDisplayBold capitalize text-white text-lg leading-5">
              {
                bloodDonations?.filter(
                  (donation) => donation.donationStatus === "Rejected",
                ).length
              }
            </h3>
          </div>
        </div>

        <div
          className={`bg-white w-full py-4 px-2.5 mt-4 rounded-lg ${shadow.lightShadow}`}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="font-DMSansSemiBold text-slate-900 capitalize pb-1.5">
              List of Blood Donations
            </p>
            <div className="flex items-center justify-between gap-x-4">
              <p className="font-DMSansSemiBold text-slate-900 capitalize">
                Filters:
              </p>
              <div className="flex items-center gap-x-3.5 flex-row-reverse">
                <select
                  className="outline-0 border-none focus:border-none focus:outline-0 bg-red-700 text-white p-1 rounded-lg cursor-pointer"
                  defaultValue={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                >
                  {monthOptions.map((option: string, index: number) => (
                    <option
                      key={index}
                      value={option.slice(0, 3).toLowerCase()}
                    >
                      {option}
                    </option>
                  ))}
                </select>
                <select
                  className="outline-0 border-none focus:border-none focus:outline-0 bg-red-700 text-white p-1 rounded-lg cursor-pointer"
                  defaultValue={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  {bloodTypes.map((option: string, index: number) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <Table className="!rounded-lg overflow-hidden">
            <TableHeader>
              <TableRow>
                <TableHead className="!px-3 !py-1.5 w-[50px] bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium"></TableHead>
                <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium">
                  Name
                </TableHead>
                <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium">
                  Donation On
                </TableHead>
                <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium">
                  Phone
                </TableHead>
                <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium">
                  Age
                </TableHead>
                <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium">
                  Donation Type
                </TableHead>
                <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium">
                  Disease
                </TableHead>
                <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium">
                  Status
                </TableHead>
                <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto w-[135px] !font-DMSansMedium">
                  Update Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="">
              {bloodDonations && bloodDonations.length > 0 ? (
                bloodDonations.map((donation, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell>{donation.name}</TableCell>
                    <TableCell>{donation.donationDate.split("T")[0]}</TableCell>
                    <TableCell>{donation.contact}</TableCell>
                    <TableCell className="text-center">
                      {donation.age}
                    </TableCell>
                    <TableCell className="text-center">
                      {donation.bloodGroup}
                    </TableCell>
                    <TableCell className="text-center">
                      {donation.disease}
                    </TableCell>
                    <TableCell>{donation.donationStatus}</TableCell>
                    <TableCell className="w-[135px]">
                      <select
                        className="w-full rounded-md bg-red-700 text-white outline-none p-1"
                        onChange={(e) =>
                          handleUpdateStatus(e.target.value, index)
                        }
                      >
                        {donation?.donationStatus === "Pending" && (
                          <>
                            <option value="">update</option>
                            <option value="Accepted">Accept</option>
                            <option value="Rejected">Reject</option>
                          </>
                        )}
                        {donation?.donationStatus === "Accepted" && (
                          <>
                            <option value="">update</option>
                            <option value="Completed">Complete</option>
                          </>
                        )}
                        {donation?.donationStatus === "Rejected" && (
                          <>
                            <option value="">Rejected</option>
                          </>
                        )}
                        {donation?.donationStatus === "Completed" && (
                          <>
                            <option value="">Completed</option>
                          </>
                        )}
                      </select>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="text-center">
                    No Donations Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default DonationStatistics;
