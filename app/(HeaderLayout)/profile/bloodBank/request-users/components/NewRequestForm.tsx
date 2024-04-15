"use client";

import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { getNearby, placeRequestToUsers } from "@/app/axios-api/Endpoint";
import { axiosInstance as axios } from "@/app/axios-api/axios";
import Loader from "@/app/components/Loader";
// import { getNearby } from '@/app/axios-api/Endpoint'

const NewRequestForm = () => {
  const [selectedUsers, setSelectedUsers] = useState<string>("");
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [bloodType, setBloodType] = useState<string>("");
  const [bloodBags, setBloodBags] = useState<number>(0);
  const [isRequiredUrgently, setIsRequiredUrgently] = useState<boolean>(false);
  const islamabadSectors = [
    "D-12",
    "E-7",
    "E-8",
    "E-9",
    "E-10",
    "E-11",
    "F-5",
    "F-6",
    "F-7",
    "F-8",
    "F-9",
    "F-10",
    "F-11",
    "G-5",
    "G-6",
    "G-7",
    "G-8",
    "G-9",
    "G-10",
    "G-11",
    "G-12",
    "G-13",
    "G-14",
    "G-15",
    "G-16",
    "H-8",
    "H-9",
    "H-11",
    "H-13",
    "H-14",
    "I-8",
    "I-9",
    "I-10",
    "I-11",
    "I-13",
    "I-14",
    "I-15",
    "I-16",
  ];
  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const bloodBagsQuantity = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

  const queryClient = useQueryClient();

  const FormSchema = z.object({
    bloodBanks: z.array(z.any()).optional(),
    area: z.string().optional(),
    bloodType: z.string().optional(),
    bloodBags: z.number().optional(),
    urgent: z.boolean().optional(),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      bloodBanks: ["Rawal Blood Bank"],
    },
  });

  useEffect(() => {
    const allErrors = Object.values(errors);
    allErrors.map((error) => notifyError(error?.message));
  }, [errors]);

  const notifyError = (errorMessage: any) => {
    toast.error(errorMessage);
  };

  const { data: nearByBB, isLoading } = useQuery({
    queryKey: ["nearByBloodBanks"],
    queryFn: async () => {
      const url = getNearby();
      const { data } = await axios.get(url);
      return data?.nearbyBloodBanks;
    },
  });

  const { mutate: placeRequest } = useMutation({
    mutationFn: async (data: any) => {
      const url = placeRequestToUsers();
      const { data: resData } = await axios.post(url, data);
      return resData;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["allRequestToUsers"] });
      toast.success(data?.message);
    },
    onError: (error: any) => {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error("Your request could not be placed. Please try again.");
      }
    },
  });

  const submitData = (data: any) => {
    data.area = selectedArea;
    if (selectedArea === "") {
      notifyError("You have to select an Area.");
      return;
    }
    if (selectedUsers === "") {
      notifyError("You have to select the Users.");
      return;
    }
    data.bloodBanks = nearByBB.map((bloodBank: any) => bloodBank._id);
    if (data.bloodBanks.length === 0) {
      notifyError("There are no Blood Banks Nearby!");
      return;
    }
    data.bloodType = bloodType;
    if (bloodType === "") {
      notifyError("You have to select a Blood Type.");
      return;
    }
    data.bloodBags = bloodBags;
    if (bloodBags === 0) {
      notifyError("You have to select a No. of Blood Bags.");
      return;
    }
    data.urgent = isRequiredUrgently;

    placeRequest(data);
  };

  if (isLoading)
    return (
      <div className="w-full grid place-items-center">
        <Loader />
      </div>
    );

  return (
    <form
      onSubmit={handleSubmit(submitData)}
      className="w-4/5 pl-6 flex flex-col gap-y-6 mb-6"
    >
      {/* Area */}
      <div className="flex flex-col gap-y-1.5 mt-4">
        <Label className="pl-2" htmlFor="area">
          Area
        </Label>
        <Select onValueChange={(val) => setSelectedArea(val)}>
          <SelectTrigger className="w-full bg-[#e4e1fd] rounded-2xl">
            <SelectValue placeholder="Select Area" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Islamabad</SelectLabel>
              {islamabadSectors.map((sector, index) => (
                <SelectItem
                  key={index}
                  value={sector}
                >{`Sector ${sector}`}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {/* Users */}
      <div className="flex flex-col gap-y-1.5">
        <Label className="pl-2" htmlFor="users">
          Users
        </Label>
        <Select onValueChange={(val) => setSelectedUsers(val)}>
          <SelectTrigger className="w-full bg-[#e4e1fd] rounded-2xl">
            <SelectValue placeholder="Select Users" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="allUsers">All Users</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* Blood Banks */}
      <div className="flex flex-col gap-y-1.5">
        <Label className="pl-2" htmlFor="area">
          Blood Banks
        </Label>
        <div className="w-full bg-[#e4e1fd] rounded-2xl py-3 px-5 max-h-[240px] overflow-y-scroll flex flex-col gap-y-1">
          {nearByBB.map((item: any, index: number) => (
            <div key={item._id} className="flex items-center gap-x-3">
              <Checkbox checked={true} />
              <label htmlFor={`bloodBank${index}`}>{item.name}</label>
            </div>
          ))}
        </div>
      </div>
      {/* Blood Type */}
      <div className="flex flex-col gap-y-1.5">
        <Label className="pl-2" htmlFor="bloodType">
          Blood Type
        </Label>
        <Select onValueChange={(val) => setBloodType(val)}>
          <SelectTrigger className="w-full bg-[#e4e1fd] rounded-2xl">
            <SelectValue placeholder="Select Blood Type" />
          </SelectTrigger>
          <SelectContent>
            {bloodTypes.map((type, index) => (
              <SelectItem key={index} value={type}>{`${type}`}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {/* No. of Blood Bags */}
      <div className="flex flex-col gap-y-1.5">
        <Label className="pl-2" htmlFor="bloodBags">
          Blood Bags
        </Label>
        <Select onValueChange={(val) => setBloodBags(Number(val))}>
          <SelectTrigger className="w-full bg-[#e4e1fd] rounded-2xl">
            <SelectValue placeholder="Select No. of Blood Bags" />
          </SelectTrigger>
          <SelectContent>
            {bloodBagsQuantity.map((bloodBagQuantity, index) => (
              <SelectItem
                key={index}
                value={bloodBagQuantity.toString()}
              >{`${bloodBagQuantity}`}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="requiredUrgently"
          onCheckedChange={(checked) =>
            setIsRequiredUrgently(checked ? true : false)
          }
        />
        <label
          htmlFor="requiredUrgently"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Required Urgently
        </label>
      </div>

      <div className="w-full flex justify-end mt-1">
        <button
          type="submit"
          className="bg-[#BF372A] text-white font-LatoMedium text-lg rounded-2xl py-0.5 px-6 w-max"
        >
          Request
        </button>
      </div>
    </form>
  );
};

export default NewRequestForm;
