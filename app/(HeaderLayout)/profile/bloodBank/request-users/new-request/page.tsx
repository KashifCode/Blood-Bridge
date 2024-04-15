import React from "react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

import NewRequestForm from "../components/NewRequestForm";

const page = () => {
  return (
    <div className={`w-full bg-stone-50 pl-[3.5%] pr-[10%] pt-6 relative`}>
      <div className="flex items-center gap-x-6">
        <Link href={"/profile/bloodBank/request-users"}>
          <ChevronLeft size={24} color="black" strokeWidth={3} />
        </Link>
        <p className="text-[#2B2929] font-LatoBold text-lg">New Request</p>
      </div>
      <NewRequestForm />
    </div>
  );
};

export default page;
