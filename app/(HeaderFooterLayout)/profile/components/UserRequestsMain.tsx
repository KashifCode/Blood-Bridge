"use client";

import React, { useEffect } from "react";
import UserRequestsChart from "@/app/(HeaderFooterLayout)/profile/components/UserRequestsChart";
import TableCard from "./TableCard";
import { getUserBloodRequests } from "@/app/axios-api/Endpoint";
import { axiosInstance as axios } from "@/app/axios-api/axios";

const UserRequestsMain = () => {
  const [requests, setRequests] = React.useState([]);
  useEffect(() => {
    const url = getUserBloodRequests();
    axios
      .get(url)
      .then((res) => {
        setRequests(res.data.bloodRequests);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="w-full flex flex-col">
      <UserRequestsChart requests={requests} />
      <div className="w-full mt-7 flex flex-col gap-y-0.5">
        <TableCard
          type="heading"
          bags="Bags"
          bloodBank="Blood Bank"
          city="City"
          contactNo="Contact No."
          date="Date"
          status="Status"
        />
        {requests && requests.length === 0 ? (
          <h1>No requests found</h1>
        ) : (
          requests.map((request: any, index: number) => {
            return (
              <TableCard
                key={index}
                type="data"
                bags={request.bloodBags}
                bloodBank={request.bloodBank.name}
                city={request.bloodBank.city}
                contactNo={request.contact}
                date={request.bloodNeededOn.split("T")[0]}
                status={request.reqStatus}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default UserRequestsMain;
