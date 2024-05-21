"use client";
import React, { useState, useEffect } from "react";
import shadow from "@/app/components/shadow.module.css";
import { Constants } from "@/globals/constants";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ZodType, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useBBSelector } from "@/redux/store";
import { BBgetAllBloodTypes, addBloodGroup, updateBloodGroup } from "@/app/axios-api/Endpoint";
import { axiosInstance as axios } from "@/app/axios-api/axios";
import { Edit3 } from "lucide-react";

interface BloodGroupForm {
  bloodGroup: string;
  stock?: number;
  bloodBankId?: string;
}

const BloodGroupForm = () => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [stockEditable, setStockEditable] = useState<number>(0 as number)
  const [bloodTypes, setBloodTypes] = useState<any[]>([]);
  const bloodBank = useBBSelector((state) => state.authReducer.value.user);
  const schema: ZodType<BloodGroupForm> = z.object({
    bloodGroup: z.string().min(1, "Blood group is required"),
    stock: z.number().optional(),
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<BloodGroupForm>({
    resolver: zodResolver(schema),
  });

  const submitData = (data: BloodGroupForm) => {
    data.bloodBankId = bloodBank?._id;
    if (!data.stock) {
      return toast.error("Stock is required")
    }
    if (data.stock < 0) {
      return toast.error("Stock cannot be negative")
    }
    const url = addBloodGroup();
    axios
      .post(url, data, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  useEffect(() => {
    const allErrors = Object.values(errors);
    allErrors.map((error) => notifyError(error?.message));
  }, [errors]);

  const notifyError = (errorMessage: any) => {
    toast.error(errorMessage);
  };

  useEffect(() => {
    const url = BBgetAllBloodTypes()

    axios.get(url, {
      withCredentials: true
    }).then((res) => {
      setBloodTypes(res.data.bloodTypes)
    }).catch((err) => {
      toast.error(err?.response?.data?.message)
    })
  }, [])

  const handleEditStock = () => {
    const data = {
      bloodGroup: getValues("bloodGroup"),
      stock: stockEditable,
    }
    const url = updateBloodGroup();
    axios.put(url, data, {
      withCredentials: true
    }).then((res) => {
      toast.success(res.data.message)
      setIsEditable(false)
    }).catch((err) => {
      toast.error(err?.response?.data?.message)
    })
  }

  return (
    <div
      className={`bg-white rounded-3xl w-3/5 min-h-[36vh] px-8 flex flex-col justify-center relative ${shadow.lightShadow}`}
    >
      {!isEditable ?
        <Edit3 color="#AA2D30" size={22} className="absolute top-5 right-6 cursor-pointer" onClick={() => setIsEditable(true)} />
        :
        <Button className="absolute top-5 right-6 !h-auto !font-RobotoRegular !text-white !bg-darkRed hover:!bg-red-800 !rounded-[48px] !text-lg !py-0.5 !px-3 w-max"
          onClick={() => setIsEditable(false)}>
          Cancel
        </Button>
      }
      <h1 className="text-xl font-DMSansSemiBold mb-3">{isEditable ? "Edit" : "Add new"} blood type</h1>
      <form
        onSubmit={handleSubmit(submitData)}
        className="flex flex-col gap-y-3 w-full"
      >
        <div className="flex flex-col gap-y-1.5">
          <Label
            htmlFor="bloodGroup"
            className="block font-DMSansSemiBold text-gray-700"
          >
            Blood Group
          </Label>
          <select
            className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none"
            {...register("bloodGroup", {
              onChange(e) {
                setStockEditable((bloodTypes.find((bloodType: any) => bloodType?.bloodGroup === e.target.value))?.stock)
              },
            })}
          >
            <option value="">Select Blood Group</option>
            {Constants.bloodGroups.map((bloodGroup) => (
              <option key={bloodGroup} value={bloodGroup}>
                {bloodGroup}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-y-1.5">
          <Label
            htmlFor="bloodGroup"
            className="block font-DMSansSemiBold text-gray-700"
          >
            Stock
          </Label>
          {!isEditable &&
            <input
              type="number"
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none"
              defaultValue={0}
              {...register("stock", {
                valueAsNumber: true,
              })}
            />
          }
          {(isEditable) &&
            <input
              type="number"
              className="block w-full py-2 px-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none bg-white"
              value={stockEditable}
              onChange={(e) => setStockEditable(Number(e.target.value))}
            />
          }
        </div>
        {!isEditable &&
          <div className="w-full flex justify-end mt-3.5">
            <Button className="!h-auto !font-RobotoRegular !text-white !bg-darkRed hover:!bg-red-800 !rounded-[48px] !text-lg !py-1 !px-4 w-max">
              Create Type
            </Button>
          </div>
        }
      </form>
      {isEditable &&
        <div className="w-full flex justify-end mt-3.5">
          <Button className="!h-auto !font-RobotoRegular !text-white !bg-darkRed hover:!bg-red-800 !rounded-[48px] !text-lg !py-1 !px-4 w-max"
            onClick={handleEditStock}>
            Edit Type
          </Button>
        </div>
      }
    </div>
  );
};

export default BloodGroupForm;
