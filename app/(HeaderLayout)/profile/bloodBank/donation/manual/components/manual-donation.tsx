"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    donateBloodManualUrl,
} from "@/app/axios-api/Endpoint";
import { axiosInstance as axios } from "@/app/axios-api/axios";
import { useBBSelector } from "@/redux/store";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface RequestBloodProps {
    name?: string;
    contact?: string;
    bloodBank?: string;
    disease?: string;
    bloodBags?: number;
    age?: number;
    bloodGroup: string;
    bloodNeededOn: string;
    donationDate?: string;
    receivedBlood?: string[];
}

const ManualDonation = () => {
    const [bloodBankOpen, setBloodBankOpen] = useState<any>(null);
    const user = useBBSelector((state) => state.authReducer.value.user);

    const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

    useEffect(() => {
        setBloodBankOpen(user)
    }, [user]);

    const schema: ZodType<RequestBloodProps> = z.object({
        name: z.string().min(1, { message: "Name is required" }),
        contact: z.string().min(1, { message: "Contact is required" }),
        bloodGroup: z.string().min(1, { message: "Blood Group is required" }),
        bloodBags: z
            .number()
            .refine(
                (value) => !isNaN(value) && Number(value) < 4 && Number(value) > 0,
                {
                    message: "No of selected blood bags must be in range 1-3",
                },
            )
            .optional(),
        bloodNeededOn: z
            .string()
            .min(1, { message: "Selection of date is required" }),
        age: z
            .number()
            .positive("Your must be atleast 18 years old to donate")
            .min(18, { message: "Your must be atleast 18 years old to donate" })
            .optional(),
        receivedBlood: z.array(z.string()).optional(),
        disease: z.string().optional(),
    });

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<RequestBloodProps>({
        resolver: zodResolver(schema),
    });

    const submitForm = (data: RequestBloodProps) => {

        if (data?.disease === "") {
            data.disease = "n/a";
        }

        data.bloodBank = bloodBankOpen?.name;
        data.donationDate = data.bloodNeededOn;

        const url = donateBloodManualUrl();
        axios
            .post(url, data, {
                withCredentials: true,
            })
            .then((res) => {
                console.log(res);
                toast.success(res.data.message);
            })
            .catch((err) => {
                console.log(err);
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

    const today = new Date();

    return (
        <div className="w-full my-6">
            <div className="w-full">
                <div className="w-full px-[8%]">
                    <Link href="/profile/bloodBank/donation">
                        <div className="flex items-center gap-x-1 my-4 cursor-pointer">
                            <ChevronLeft size={20} />
                            <h1 className="text-lg font-LatoBold font-semibold">Back</h1>
                        </div>
                    </Link>
                    <h1 className="mb-6 text-black text-2xl font-PlayfairDisplayBold">
                        Donate Blood!
                    </h1>
                    <div className="w-full flex items-start gap-x-[9%]">
                        <div className="w-full">
                            <form
                                onSubmit={handleSubmit(submitForm)}
                                className="flex flex-col gap-y-3"
                            >
                                <div className="flex flex-col gap-y-1">
                                    <Label className="!font-LatoMedium font-medium pl-1">
                                        Name
                                    </Label>
                                    <input
                                        type="text"
                                        className="w-full focus:outline-0 outline-0 rounded-2xl bg-stone-200 py-1.5 px-3 text-black"
                                        {...register("name")}
                                    />
                                </div>
                                <div className="flex flex-col gap-y-1">
                                    <Label className="!font-LatoMedium font-medium pl-1">
                                        Contact
                                    </Label>
                                    <input
                                        type="text"
                                        className="w-full focus:outline-0 outline-0 rounded-2xl bg-stone-200 py-1.5 px-3 text-black"
                                        {...register("contact")}
                                    />
                                </div>
                                <div className="flex flex-col gap-y-1">
                                    <Label className="!font-LatoMedium font-medium pl-1">
                                        Blood Bank
                                    </Label>
                                    <input
                                        type="text"
                                        className="w-full focus:outline-0 outline-0 rounded-2xl bg-stone-200 py-1.5 px-3 text-black bg-opacity-60 text-opacity-80"
                                        value={bloodBankOpen?.name}
                                        readOnly
                                    />
                                </div>
                                <div className="flex flex-col gap-y-1">
                                    <Label className="!font-LatoMedium font-medium pl-1">
                                        Blood Type
                                    </Label>
                                    <select
                                        className={`w-full focus:outline-0 outline-0 rounded-2xl bg-stone-200 py-1.5 px-3`}
                                        {...register("bloodGroup")}
                                    >
                                        <option value="">
                                            Select blood type
                                        </option>
                                        {bloodTypes.map((type) => (
                                            <option key={type} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex flex-col gap-y-1">
                                    <Label className="!font-LatoMedium font-medium pl-1">
                                        Age
                                    </Label>
                                    <input
                                        type="number"
                                        className={`w-full focus:outline-0 outline-0 rounded-2xl bg-stone-200 py-1.5 px-3`}
                                        defaultValue={"0"}
                                        {...register("age", {
                                            valueAsNumber: true,
                                            onChange: (e) => {
                                                if (e.target.value === "" || e.target.value < 0) {
                                                    e.target.value = "0";
                                                }
                                            },
                                        })}
                                    />
                                </div>
                                <div className="flex flex-col gap-y-1">
                                    <Label className="!font-LatoMedium font-medium pl-1">
                                        Disease (if any)
                                    </Label>
                                    <input
                                        type="text"
                                        className={`w-full focus:outline-0 outline-0 rounded-2xl bg-stone-200 py-1.5 px-3`}
                                        {...register("disease")}
                                    />
                                </div>
                                <div className="flex flex-col gap-y-1">
                                    <Label className="!font-LatoMedium font-medium pl-1">
                                        Donate On (Availability)
                                    </Label>
                                    <select
                                        className="w-full focus:outline-0 outline-0 rounded-2xl bg-stone-200 py-1.5 px-3"
                                        {...register("bloodNeededOn")}
                                    >
                                        <option value="">Select Date</option>
                                        <option value={`${today.toLocaleDateString()}`}>
                                            {today.toDateString()}
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <Button
                                        variant={"outline"}
                                        className="!py-1 !pr-0 !h-auto !rounded-full !border-2 !border-[#AA2D30] !bg-[#AA2D30] !text-white w-full font-LatoMedium focus:!ring-0 text-sm md:text-base lg:text-lg !pl-1 mt-2.5"
                                    >
                                        Donate
                                    </Button>
                                </div>
                            </form>
                        </div>
                        <div className="w-full">
                            <h1 className="text-[28px] font-LatoBold !font-semibold">
                                Blood Donation!
                            </h1>
                            <h3 className="text-xl font-LatoBold !font-semibold mt-3">
                                {bloodBankOpen?.name}
                            </h3>
                            <p className="font-LatoRegular mt-3 mb-4">These donations allow us to help others!</p>

                            <p className="font-LatoRegular">
                                Donating blood not only saves lives but also offers numerous
                                health benefits to donors. When you donate blood,
                                you contribute to replenishing the blood supply,
                                which is crucial for medical emergencies, surgeries, and
                                treatments for various illnesses. Moreover, regular blood donation
                                helps lower the risk of cardiovascular diseases by reducing
                                the viscosity of blood, which in turn decreases the
                                risk of clot formation. It also stimulates the production of
                                new blood cells, promoting overall well-being. Additionally,
                                donating blood can provide donors with a sense of fulfillment
                                and satisfaction, knowing that they are making a meaningful
                                difference in the lives of others.
                            </p>

                            <div className="flex items-center gap-x-2.5 mt-4">
                                <h3 className="text-lg font-LatoBold !font-semibold">
                                    Contact for Queries:
                                </h3>
                                <h3 className="text-lg font-LatoBold !font-semibold">
                                    {bloodBankOpen?.contact}
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManualDonation