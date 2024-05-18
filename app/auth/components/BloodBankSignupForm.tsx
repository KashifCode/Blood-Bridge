"use client";
import React, { useState, useEffect, useCallback } from "react";
import InputField from "@/app/auth/components/inputField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType, z } from "zod";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import HidePassword from "@/globals/icons/hide-password";
import ShowPassword from "@/globals/icons/show-password";
import { axiosInstance as axios } from "@/app/axios-api/axios";
import cx from "classnames";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { registerBloodBankUrl } from "@/app/axios-api/Endpoint";
import { passwordStrength } from "check-password-strength";
import { Constants } from "@/globals/constants";

export interface BloodBankSignupData {
  name: string;
  email: string;
  licenseNo: string;
  contact: string;
  password?: string;
  confirmPassword?: string;
  latitude?: number;
  longitude?: number;
}

export type BloodBankfieldTypes =
  | "email"
  | "password"
  | "name"
  | "contact"
  | "licenseNo"
  | "confirmPassword";

const BloodBankSignupForm = () => {
  const token = useParams();
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  }>({ lat: 0, lng: 0 });

  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [agreeConditions, setAgreeConditions] = useState<boolean>(false);
  const [typedPasswordStrength, setTypedPasswordStrength] =
    useState<string>("");

  const schema: ZodType<BloodBankSignupData> = z
    .object({
      name: z
        .string()
        .nonempty({ message: "Blood Bank Name is required" })
        .min(3, "Blood Bank Name must be at least 3 characters long"),
      licenseNo: z.string().nonempty({ message: "License Number is required" }),
      email: z.string().email({ message: "Email is invalid" }),
      contact: z
        .string()
        .nonempty("Contact is Required")
        .refine((value) => Constants.phoneRegExp.test(value), {
          message: "Contact must be 11 digits long starting with 0",
        }),
      password: z
        .string()
        .nonempty({ message: "Password is required" })
        .min(8, "Password must be at least 8 characters long"),
      confirmPassword: z
        .string()
        .nonempty({ message: "Confirm Password is required" })
        .min(8, "Confirm Password must be at least 8 characters long"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BloodBankSignupData>({
    resolver: zodResolver(schema),
  });

  const { push } = useRouter();

  const getLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(userLocation);
        },
        (error) => {
          console.error("Error getting location:", error.message);
          toast.error(
            `Location Denied, Please Allow location access to continue`,
          );
          push("/");
        },
        {
          enableHighAccuracy: true,
        },
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  }, [push]);

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  const SubmitData = async (data: BloodBankSignupData) => {
    if (!agreeConditions) {
      toast.error("Please agree to the terms and conditions");
      return;
    }
    if (typedPasswordStrength !== "Strong") {
      toast.error("Password Must be Strong");
      return;
    }

    if (userLocation.lat === 0 && userLocation.lng === 0) {
      toast.error("Please allow location access to continue");
      return;
    } else {
      data.latitude = userLocation.lat;
      data.longitude = userLocation.lng;
    }

    const url = registerBloodBankUrl();
    axios
      .post(url, data)
      .then((res) => {
        toast.success(res.data.message);
        push("/auth/signIn?view=BloodBank");
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

  return (
    <form className="w-full" onSubmit={handleSubmit(SubmitData)}>
      <div className="w-[94%] md:!w-3/4 grid grid-cols-1 md:!grid-cols-2 mx-auto gap-x-32 gap-y-6">
        <InputField
          fieldName="name"
          fieldType="text"
          fieldTitle="Blood Bank"
          fieldLabel={"lifestream blood bank"}
          register={register}
          isError={errors?.name && true}
        />
        <InputField
          fieldName="email"
          fieldType="email"
          fieldTitle="Email"
          fieldLabel={"aliakbar@gmail.com"}
          register={register}
          titleCase="lowercase"
          isError={errors?.email && true}
        />
        <InputField
          fieldName="licenseNo"
          fieldType="text"
          fieldTitle="License Number"
          fieldLabel={"562084"}
          register={register}
          titleCase="lowercase"
          isError={errors?.licenseNo && true}
        />

        {/* <div className='w-full flex flex-col-reverse'>
                    <label htmlFor="firstName" className='text-zinc-500 text-[11px] md:!text-xs font-normal font-LatoRegular uppercase tracking-[2.50px] md:!tracking-[3.50px] pl-3 pt-0.5'>Islamabad</label>
                    <select className={cx('focus:outline-0 focus:border-b focus:shadow-none border-b outline-0 shadow-none border-black w-full py-[5px] px-3 tracking-[3px]', { '!border-red-500': errors?.city ? true : false })} {...register("city")}>
                        <option value="">Select City</option>
                        <option value="Islamabad">Islamabad</option>
                        <option value="Rawalpindi">Rawalpindi</option>
                    </select>
                </div> */}

        <InputField
          fieldName="contact"
          fieldType="text"
          fieldTitle="Contact"
          fieldLabel={"eg. 03256245871"}
          register={register}
          titleCase="capitalize"
          isError={errors?.contact && true}
        />

        <div className="w-full relative">
          <div className="w-full flex flex-col-reverse">
            <label
              htmlFor="password"
              className="text-zinc-500 text-[11px] md:!text-xs font-normal font-LatoRegular capitalize tracking-[2.50px] md:!tracking-[3.50px] pl-3 pt-0.5"
            >
              Combination of alphanumerics & symbols
            </label>
            <input
              {...register("password", {
                onChange: (e) => {
                  setTypedPasswordStrength(
                    passwordStrength(e.target.value).value,
                  );
                },
              })}
              type={isShowPassword ? "text" : "password"}
              placeholder="Password"
              className={cx(
                "placeholder:uppercase placeholder:font-LatoRegular placeholder:text-zinc-500 text-sm md:!text-base placeholder:text-sm md:placeholder:text-lg focus:outline-0 focus:border-b focus:shadow-none border-b outline-0 shadow-none border-black w-full py-[5px] px-3 tracking-[3px] text-red-500",
                { "!text-black": typedPasswordStrength === "Strong" },
              )}
            />
          </div>
          <div
            className="absolute top-2 my-auto right-2 cursor-pointer"
            onClick={() => setIsShowPassword(!isShowPassword)}
          >
            {isShowPassword ? <ShowPassword /> : <HidePassword />}
          </div>
          {typedPasswordStrength !== "" && (
            <div className="absolute left-2 -bottom-6">
              <p className="pl-1.5 text-zinc-500 text-sm font-LatoRegular tracking-[1px]">
                Password is{" "}
                <span
                  className={cx("text-green-600 uppercase", {
                    "!text-red-500": typedPasswordStrength !== "Strong",
                  })}
                >
                  {typedPasswordStrength}
                </span>
              </p>
            </div>
          )}
        </div>
        <div className="w-full relative">
          <div className="w-full flex flex-col-reverse">
            <label
              htmlFor="confirmPassword"
              className="text-zinc-500 text-[11px] md:!text-xs font-normal font-LatoRegular capitalize tracking-[2.50px] md:!tracking-[3.50px] pl-3 pt-0.5"
            >
              Combination of alphanumerics & symbols
            </label>
            <input
              {...register("confirmPassword")}
              type={isShowPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="placeholder:uppercase placeholder:font-LatoRegular placeholder:text-zinc-500 text-sm md:!text-base placeholder:text-sm md:placeholder:text-lg focus:outline-0 focus:border-b focus:shadow-none border-b outline-0 shadow-none border-black w-full py-[5px] px-3 tracking-[3px]"
            />
          </div>
          <div
            className="absolute top-2 my-auto right-2 cursor-pointer"
            onClick={() => setIsShowPassword(!isShowPassword)}
          >
            {isShowPassword ? <ShowPassword /> : <HidePassword />}
          </div>
        </div>
      </div>
      <div className="w-3/4 mx-auto mt-4">
        <div className="flex items-center gap-x-2">
          <input
            id="agreeTerms"
            type="checkbox"
            onChange={() => setAgreeConditions(!agreeConditions)}
            checked={agreeConditions}
          />
          <label
            htmlFor="agreeTerms"
            className="text-zinc-500 text-[11px] md:!text-xs font-normal font-LatoRegular capitalize tracking-[2px] my-7"
          >
            I agree to{" "}
            <Link
              href={"/terms-and-conditions"}
              className="text-blue-600 cursor-pointer"
            >
              terms & conditions
            </Link>
          </label>
        </div>
        <Button
          className="w-full rounded-3xl bg-red-700 font-LatoBold uppercase tracking-[2.50px] md:!tracking-[3.50px] hover:bg-red-800"
          type="submit"
        >
          Sign Up
        </Button>

        <p className="text-zinc-500 text-[11px] md:!text-xs font-normal font-LatoRegular capitalize tracking-[2px] mt-4">
          already have an account?{" "}
          <Link
            href={"/auth/signIn/?view=BloodBank"}
            className="text-blue-600 cursor-pointer"
          >
            Sign In
          </Link>
        </p>
      </div>
    </form>
  );
};

export default BloodBankSignupForm;
