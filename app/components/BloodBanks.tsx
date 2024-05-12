"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import BloodBankCard from "@/app/components/BloodBankCard";
import { StaticImageData } from "next/image";
import { getBloodBanksHome } from "../axios-api/Endpoint";
import { axiosInstance as axios } from "../axios-api/axios";
import toast from "react-hot-toast";

interface Location {
  lat: number;
  lng: number;
}

interface AvailableBloodGroups {
  bloodType: string;
  quantity: number;
}

export interface BloodBankInterface {
  image: StaticImageData;
  name: string;
  address: string;
  location: Location;
  availableBloodGroups: AvailableBloodGroups[];
}

const BloodBanks = () => {
  const [bloodBanks, setBloodBanks] = useState<BloodBankInterface[]>([]);

  useEffect(() => {
    const url = getBloodBanksHome();
    axios.get(url).then((res) => {
      setBloodBanks(res.data.bloodBanks);
    }).catch((err) => {
      console.log(err);
      toast.error(err?.response?.data?.message || "An error occurred");
    })
  }, []);

  return (
    <div className="w-full flex flex-col items-center pl-[6%] pr-[3%] my-6 gap-y-7">
      <h1 className=" text-zinc-800 italic text-3xl md:text-4xl font-PlayfairDisplayBold">
        Blood Banks
      </h1>
      <div className="grid gap-x-10 gap-y-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {bloodBanks.map((bloodBank, index) => (
          <BloodBankCard key={index} bloodBank={bloodBank} />
        ))}
      </div>
      <Link href={"/blood-banks"}>
        <Button className="!bg-darkRed !rounded-full !min-w-[150px] !text-base lg:!text-lg !py-2">
          View More
        </Button>
      </Link>
    </div>
  );
};

export default BloodBanks;
