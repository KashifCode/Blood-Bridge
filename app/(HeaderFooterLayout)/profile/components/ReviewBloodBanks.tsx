"use client";

import React, { useState, useEffect } from "react";
import { axiosInstance as axios } from "@/app/axios-api/axios";
import {
  getUserBloodDonations,
  getUserBloodRequests,
  reviewBloodBank,
} from "@/app/axios-api/Endpoint";
import { useBBSelector } from "@/redux/store";
import toast from "react-hot-toast";
import Image from "next/image";
import cx from "classnames";

const ReviewBloodBanks = () => {
  const [userRequests, setUserRequests] = useState<any[]>([]);
  const [userDonations, setUserDonations] = useState<any[]>([]);
  const [selected, setSelected] = useState("All");
  const [toView, setToView] = useState<any>();
  const [feedback, setFeedback] = useState("");

  const user = useBBSelector((state) => state.authReducer.value.user);

  useEffect(() => {
    const url1 = getUserBloodDonations();
    const url2 = getUserBloodRequests();

    axios
      .get(url1)
      .then((res) => {
        setUserDonations(res.data.bloodDonations);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message || "Something went wrong");
      });

    axios
      .get(url2)
      .then((res) => {
        setUserRequests(res.data.bloodRequests);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message || "Something went wrong");
      });
  }, []);

  const filtered =
    selected === "Donations"
      ? userDonations
      : selected === "Requests"
        ? userRequests
        : [...userDonations, ...userRequests];
  //remove any with pending or accepted status
  const filtered2 = filtered.filter(
    (item) =>
      item?.reqStatus === "Completed" ||
      item?.reqStatus === "Rejected" ||
      item?.donationStatus === "Completed" ||
      item?.donationStatus === "Rejected",
  );

  const handleSubmit = () => {
    if (feedback === "") {
      toast.error("Please write feedback");
      return;
    }

    if (feedback.length < 30) {
      toast.error("Feedback should be atleast 30 characters long");
      return;
    }

    const url = reviewBloodBank();
    const data = {
      bloodBankId: toView.bloodBank._id,
      comment: feedback,
    };

    axios
      .post(url, data)
      .then((res) => {
        setFeedback("");
        setToView(undefined);
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message || "Something went wrong");
      });
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <h3 className="text-black font-RobotoBold text-xl mb-6">Reviews</h3>
        <select
          className="outline-0 border-none focus:border-none focus:outline-0 bg-red-700 text-white p-1 rounded-lg cursor-pointer"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Donations">Donations</option>
          <option value="Requests">Requests</option>
        </select>
      </div>
      <div className="w-full flex items-start gap-x-12">
        <div className="w-2/6 flex flex-col gap-y-4">
          {filtered2.length > 0 &&
            filtered2.map((item, index) => (
              <div
                key={index}
                className={cx(
                  "w-full bg-[#EAE5E5] hover:bg-[#D9D9D9] py-2 px-4 rounded-lg cursor-pointer flex items-center gap-x-4",
                  { "!bg-[#D9D9D9]": toView?._id === item._id },
                )}
                onClick={() => setToView(item)}
              >
                <div className="w-12 h-12">
                  <Image
                    className="!w-full !h-full rounded-full object-cover"
                    width={48}
                    height={48}
                    src={user.avatar}
                    alt="UserImg"
                  />
                </div>
                <div className="flex flex-col gap-y-0.5">
                  <p className="text-black font-RobotoMedium text-lg">
                    {item.bloodBank.name}
                  </p>
                  {item.bloodNeededOn ? (
                    <>
                      <p className="text-black font-RobotoRegular text-lg">
                        {item?.bloodNeededOn?.split("T")[0]}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-black font-RobotoRegular text-lg">
                        {item?.donationDate?.split("T")[0]}
                      </p>
                    </>
                  )}
                </div>
              </div>
            ))}
        </div>
        <div className="w-4/6 bg-[#F3F3F3] p-4">
          {toView && (
            <>
              <h3 className="text-black font-RobotoBold text-xl py-2">
                Reviews
              </h3>
              <div className="flex flex-col gap-y-1">
                <p className="text-black font-RobotoRegular text-lg">
                  {toView.bloodBank.name}
                </p>
                {toView.bloodNeededOn ? (
                  <>
                    <p className="text-black font-RobotoRegular text-lg">
                      <span className="font-RobotoMedium">Blood:</span>{" "}
                      {toView?.bloodGroup.bloodGroup}
                    </p>
                    <p className="text-black font-RobotoRegular text-lg">
                      <span className="font-RobotoMedium">Quantity:</span>{" "}
                      {toView?.bloodBags} bags
                    </p>
                    <p className="text-black font-RobotoRegular text-lg">
                      <span className="font-RobotoMedium">Date:</span>{" "}
                      {toView?.bloodNeededOn?.split("T")[0]}
                    </p>
                    <p className="text-black font-RobotoRegular text-lg">
                      <span className="font-RobotoMedium">Status:</span>{" "}
                      {toView?.reqStatus}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-black font-RobotoRegular text-lg">
                      <span className="font-RobotoMedium">Blood:</span>{" "}
                      {toView?.bloodGroup}
                    </p>
                    <p className="text-black font-RobotoRegular text-lg">
                      <span className="font-RobotoMedium">Age:</span>{" "}
                      {toView?.age} Years
                    </p>
                    <p className="text-black font-RobotoRegular text-lg">
                      <span className="font-RobotoMedium">Date:</span>{" "}
                      {toView?.donationDate?.split("T")[0]}
                    </p>
                    <p className="text-black font-RobotoRegular text-lg">
                      <span className="font-RobotoMedium">Status:</span>{" "}
                      {toView?.donationStatus}
                    </p>
                  </>
                )}
              </div>
              <h3 className="text-black font-RobotoBold text-xl py-2">
                Feedback
              </h3>
              <textarea
                className="w-full bg-[#FAFAFA] rounded-md px-3 py-2 text-black font-medium placeholder:text-black placeholder:font-medium"
                placeholder="Write feedback here..."
                rows={10}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                style={{ resize: "none" }}
              />
              <div className="w-full flex justify-end mt-2">
                <button
                  className="bg-red-700 text-white rounded-md px-4 py-2"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewBloodBanks;
