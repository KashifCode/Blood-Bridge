"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import UpdateUserForm from "@/app/(HeaderFooterLayout)/profile/components/UpdateUserForm";
import UpdateUserPassword from "@/app/(HeaderFooterLayout)/profile/components/UpdateUserPassword";
import { userUpdatePasswordUrl } from "@/app/axios-api/Endpoint";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const UpdateUserProfile = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const url = userUpdatePasswordUrl();
  return (
    <div className="flex flex-col justify-between w-full relative">
      <div className="w-full flex justify-start pb-3 md:!hidden">
        <Link className="w-max" href="/profile/user">
          <div className="flex items-center gap-x-1 mb-2 cursor-pointer">
            <ChevronLeft size={20} />
            <h1 className="font-LatoBold font-semibold">Back</h1>
          </div>
        </Link>
      </div>
      <h3 className="text-black font-RobotoBold text-lg md:!text-xl mb-6">Account</h3>
      {!isEdit && (
        <span
          className="absolute top-4 md:!top-2 right-2 w-max rounded-3xl bg-darkRed hover:bg-red-800 text-sm md:!text-base px-3 md:!px-5 py-0.5 text-white text-center cursor-pointer"
          onClick={() => setIsEdit(true)}
        >
          Edit
        </span>
      )}
      <UpdateUserForm changeDetails={isEdit} setChangeDetails={setIsEdit} />
      <Accordion type="single" collapsible>
        <AccordionItem className="!border-none" value="showPassword">
          <AccordionTrigger className="text-black font-RobotoBold text-lg md:!text-xl mb-4 hover:no-underline bg-white !py-1.5 mt-4 px-3 rounded-md">
            Password
          </AccordionTrigger>
          <AccordionContent>
            <UpdateUserPassword
              changeDetails={isEdit}
              setChangeDetails={setIsEdit}
              url={url}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default UpdateUserProfile;
