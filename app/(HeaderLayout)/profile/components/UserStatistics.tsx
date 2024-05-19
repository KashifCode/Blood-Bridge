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
  BBgetAllBloodDonations,
  BBgetAllBloodRequestes,
} from "@/app/axios-api/Endpoint";
import toast from "react-hot-toast";
import exportFromJSON from "export-from-json";

const UserStatistics = () => {
  const [bloodDonations, setbloodDonations] = useState<any[]>();
  const [bloodRequests, setBloodRequests] = useState<any[]>();
  const [users, setUsers] = useState<any>();
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    if (!bloodDonations && !bloodRequests) {
      const url = BBgetAllBloodDonations();
      axios
        .get(url, {
          withCredentials: true,
        })
        .then((res) => {
          setbloodDonations(res.data.bloodDonations);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          console.log(err);
        });
      const url2 = BBgetAllBloodRequestes();
      axios
        .get(url2, {
          withCredentials: true,
        })
        .then((res) => {
          setBloodRequests(res.data.bloodRequests);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          console.log(err);
        });
    }
  }, [bloodDonations, bloodRequests]);

  useEffect(() => {
    if (bloodDonations && bloodRequests) {
      const uniqueUsers = [...bloodDonations, ...bloodRequests].filter(
        (v, i, a) => a.findIndex((t) => t.user?._id === v.user?._id) === i,
      );

      const users = uniqueUsers.map((user) => {
        const donations = bloodDonations.filter(
          (donation) => donation?.user?._id === user?.user?._id,
        );
        const requests = bloodRequests.filter(
          (request) => request?.user?._id === user?.user?._id,
        );
        return {
          user,
          donations: donations.length,
          requests: requests.length,
        };
      });
      const donatedUsers = users.filter((user) => user.donations > 0);
      const requestedUsers = users.filter((user) => user.requests > 0);
      setUsers({ users, donatedUsers, requestedUsers });
    }
  }, [bloodDonations, bloodRequests]);

  function calculateAge(birthday: Date) {
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  const handleExport = () => {
    let data: any = {};
    let serial = 1;
    data = users.users!.map((record: any) => {
      const rowData: any = {};
      rowData["S.No"] = serial++;
      rowData["Name"] = record?.user?.name;
      rowData["Age"] = calculateAge(new Date(record?.user?.user?.dob?.split('T')[0]));
      rowData["Phone"] = record?.user?.contact;
      rowData["Blood Group"] = record?.user?.user?.bloodGroup;
      rowData["Status"] = (record?.requests > 0 && record?.donations > 0) ? "Donor/Requester" : (record?.requests > 0 && record?.donations === 0) ? "Requester" : (record?.requests === 0 && record?.donations > 0) ? "Donor" : "-";

      const keys = Object.keys(record);
      keys.forEach((key) => {
        rowData[key] = record[key];
      });
      delete rowData["__v"];
      delete rowData["_id"];
      delete rowData["createdAt"];
      delete rowData["user"];

      return rowData;
    });

    exportFromJSON({ data, fileName: "Users", exportType: exportFromJSON.types.xls });
  }

  return (
    <div className="w-full">
      <div className="w-full flex gap-x-7 items-center">
        <div className="py-3 px-4 rounded-xl bg-[#20283E] min-w-[155px]">
          <h3 className="font-PlayfairDisplayBold capitalize text-white text-lg leading-5">
            Total Users
          </h3>
          <h3 className="font-PlayfairDisplayBold capitalize text-white text-lg leading-5">
            {bloodDonations &&
              bloodRequests &&
              [...bloodDonations, ...bloodRequests].filter(
                (v, i, a) =>
                  a.findIndex((t) => t.user?._id === v.user?._id) === i,
              )?.length}
          </h3>
        </div>
        <div className="py-3 px-4 rounded-xl bg-[#0A5620] min-w-[155px]">
          <h3 className="font-PlayfairDisplayBold capitalize text-white text-lg leading-5">
            Total Donars
          </h3>
          <h3 className="font-PlayfairDisplayBold capitalize text-white text-lg leading-5">
            {users?.donatedUsers?.length}
          </h3>
        </div>
        <div className="py-3 px-4 rounded-xl bg-[#B3C100] min-w-[155px]">
          <h3 className="font-PlayfairDisplayBold capitalize text-white text-lg leading-5">
            Total Requesters
          </h3>
          <h3 className="font-PlayfairDisplayBold capitalize text-white text-lg leading-5">
            {users?.requestedUsers?.length}
          </h3>
        </div>
      </div>

      <div className="w-full flex justify-end">
        <div className="flex items-center gap-x-4">
          <button
            className="bg-[#255E79] hover:bg-[#255E69] text-white font-DMSansBold !h-auto !py-1.5 !px-6 rounded-3xl"
            onClick={handleExport}
          >
            Export
          </button>
          <p className="font-DMSansSemiBold text-slate-900 capitalize">
            Filter
          </p>
          <select
            className="rounded-lg py-1 px-3 focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-0 bg-red-700 text-white transition-all"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Requester/Donar</option>
            <option value="donar">Donars</option>
            <option value="requester">Requesters</option>
          </select>
        </div>
      </div>

      <div
        className={`bg-white w-full py-4 px-2.5 mt-4 rounded-lg ${shadow.lightShadow}`}
      >
        <p className="font-DMSansSemiBold text-slate-900 capitalize pb-1.5">
          List of Blood Donations
        </p>
        <Table className="!rounded-lg overflow-hidden">
          <TableHeader>
            <TableRow>
              <TableHead className="!px-3 !py-1.5 w-[50px] bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium"></TableHead>
              <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium">
                Name
              </TableHead>
              <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium">
                Age
              </TableHead>
              <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium">
                Phone
              </TableHead>
              <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium">
                Blood Group
              </TableHead>
              <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium">
                Status
              </TableHead>
              {(filter === "all" || filter === "requester") && (
                <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium">
                  Total Requests
                </TableHead>
              )}
              {(filter === "all" || filter === "donar") && (
                <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium">
                  Total Donations
                </TableHead>
              )}
              {filter === "donar" && (
                <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium">
                  Disease
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {filter === "all" &&
              users?.users &&
              users.users.map((aUser: any, index: number) => (
                <TableRow key={index}>
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell>{aUser?.user?.name}</TableCell>
                  <TableCell className="text-center">
                    {aUser?.user?.user
                      ? calculateAge(
                        new Date(aUser?.user?.user?.dob.split("T")[0]),
                      )
                      : "-"}
                  </TableCell>
                  <TableCell>{aUser?.user?.contact}</TableCell>
                  <TableCell className="text-center">
                    {aUser?.user?.user?.bloodGroup}
                  </TableCell>
                  <TableCell>
                    {aUser?.donations > 0 && aUser?.requests > 0
                      ? "Donor/Requester"
                      : aUser?.donations > 0 && aUser?.requests === 0
                        ? "Blood Donar"
                        : aUser?.donations === 0 && aUser?.requests > 0
                          ? "Blood Requester"
                          : "-"}
                  </TableCell>
                  <TableCell className="text-center">
                    {aUser?.requests}
                  </TableCell>
                  <TableCell className="text-center">
                    {aUser?.donations}
                  </TableCell>
                </TableRow>
              ))}
            {filter === "donar" &&
              users?.donatedUsers &&
              users.donatedUsers.map((aUser: any, index: number) => (
                <TableRow key={index}>
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell>{aUser?.user?.name}</TableCell>
                  <TableCell className="text-center">
                    {aUser?.user?.user
                      ? calculateAge(
                        new Date(aUser?.user?.user?.dob.split("T")[0]),
                      )
                      : "-"}
                  </TableCell>
                  <TableCell>{aUser?.user?.contact}</TableCell>
                  <TableCell className="text-center">
                    {aUser?.user?.user?.bloodGroup}
                  </TableCell>
                  <TableCell>
                    {aUser?.donations > 0 && aUser?.requests > 0
                      ? "Donor/Requester"
                      : aUser?.donations > 0 && aUser?.requests === 0
                        ? "Blood Donar"
                        : aUser?.donations === 0 && aUser?.requests > 0
                          ? "Blood Requester"
                          : "-"}
                  </TableCell>
                  <TableCell className="text-center">
                    {aUser?.donations}
                  </TableCell>
                  <TableCell className="text-center">
                    {aUser?.user?.disease}
                  </TableCell>
                </TableRow>
              ))}
            {filter === "requester" &&
              users?.requestedUsers &&
              users.requestedUsers.map((aUser: any, index: number) => (
                <TableRow key={index}>
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell>{aUser?.user?.name}</TableCell>
                  <TableCell className="text-center">
                    {aUser?.user?.user
                      ? calculateAge(
                        new Date(aUser?.user?.user?.dob.split("T")[0]),
                      )
                      : "-"}
                  </TableCell>
                  <TableCell>{aUser?.user?.contact}</TableCell>
                  <TableCell className="text-center">
                    {aUser?.user?.user?.bloodGroup}
                  </TableCell>
                  <TableCell>
                    {aUser?.donations > 0 && aUser?.requests > 0
                      ? "Donor/Requester"
                      : aUser?.donations > 0 && aUser?.requests === 0
                        ? "Blood Donar"
                        : aUser?.donations === 0 && aUser?.requests > 0
                          ? "Blood Requester"
                          : "-"}
                  </TableCell>
                  <TableCell className="text-center">
                    {aUser?.requests}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserStatistics;
