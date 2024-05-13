"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { axiosInstance as axios } from "@/app/axios-api/axios";
import { submitUserFeedback } from "@/app/axios-api/Endpoint";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const UserFeedbackForm = () => {
  const [feedback, setFeedback] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (feedback === "") {
      toast.error("Feedback cannot be empty");
      return;
    }
    if (feedback.length < 20) {
      toast.error("Feedback must be at least 20 characters long");
      return;
    }
    if (feedback.length > 200) {
      toast.error("Feedback must be less than or 200 characters long");
      return;
    }

    const url = submitUserFeedback();
    axios
      .post(url, { feedback })
      .then((res) => {
        console.log(res.data);
        toast.success(res?.data?.message);
        setFeedback("");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || "Something went wrong");
      });
  };
  return (
    <div className="flex flex-col justify-between w-full relative">
      <div className="w-full flex justify-start mb-2 md:!hidden">
        <Link className="w-max" href="/profile/user">
          <div className="flex items-center gap-x-1 mb-2 cursor-pointer">
            <ChevronLeft size={20} />
            <h1 className="font-LatoBold font-semibold">Back</h1>
          </div>
        </Link>
      </div>
      <h3 className="text-black font-RobotoBold text-lg md:!text-xl mb-4 capitalize">
        Submit Feedback
      </h3>
      <form onSubmit={handleSubmit} className="w-full flex flex-col items-end">
        <textarea
          className="w-full bg-slate-200 bg-opacity-90 rounded-[14px] text-sm md:!text-base focus:outline-0 p-3 text-black font-RobotoRegular placeholder:text-black placeholder:font-RobotoMedium"
          placeholder="Type your feedback here..."
          style={{ resize: "none" }}
          name="userFeedback"
          id="userFeedback"
          rows={14}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <Button
          type="submit"
          className="!w-max !rounded-3xl !bg-darkRed hover:!bg-red-800 !h-auto !py-1 md:!py-2 min-w-[90px] md:min-w-[130px] !text-sm md:!text-base mt-4"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default UserFeedbackForm;
