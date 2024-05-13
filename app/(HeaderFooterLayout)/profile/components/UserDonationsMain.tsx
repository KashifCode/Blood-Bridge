"use client";

import React, { useState, useEffect } from "react";
import TableCard from "./TableCard";
import { getUserBloodDonations } from "@/app/axios-api/Endpoint";
import { axiosInstance as axios } from "@/app/axios-api/axios";
import UserDonationsChart from "./UserDonationsChart";
import toast from "react-hot-toast";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

const UserDonationsMain = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const url = getUserBloodDonations();
    axios
      .get(url)
      .then((res) => {
        console.log(res.data.bloodDonations);
        setDonations(res.data.bloodDonations);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message || "Something went wrong");
      });
  }, []);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex justify-start md:!hidden">
        <Link className="w-max" href="/profile/user">
          <div className="flex items-center gap-x-1 mb-2 cursor-pointer">
            <ChevronLeft size={20} />
            <h1 className="font-LatoBold font-semibold">Back</h1>
          </div>
        </Link>
      </div>
      <UserDonationsChart donations={donations} />
      <div className="w-full mt-7 flex flex-col gap-y-0.5">
        <TableCard
          type="heading"
          age="Age"
          bloodBank="Blood Bank"
          city="City"
          contactNo="Contact No."
          date="Date"
          status="Status"
          isDonationCard={true}
        />
        {donations && donations.length === 0 ? (
          <h1>No donations found</h1>
        ) : (
          donations.map((donation: any, index: number) => {
            return (
              <TableCard
                key={index}
                type="data"
                age={donation.age}
                bags={donation.bloodBags}
                bloodBank={donation.bloodBank.name}
                city={donation.bloodBank.city}
                contactNo={donation.contact}
                date={donation.donationDate.split("T")[0]}
                status={donation.donationStatus}
                isDonationCard={true}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default UserDonationsMain;
