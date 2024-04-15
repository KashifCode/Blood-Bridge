import React from "react";
import shadow from "@/app/components/shadow.module.css";
import { BASE } from "@/app/axios-api/Endpoint";
import VerifyLinkUI from "@/app/auth/[user]/[id]/verify/[token]/component/VerifyLinkUI";

const page = ({
  params,
}: {
  params: { id: string; token: string; user: string };
}) => {
  const { id, token, user } = params;
  const requestURL = `${BASE}auth/${user}/${id}/verify/${token}`;

  return (
    <div
      className={`w-full mt-6 bg-white min-h-[76vh] flex flex-col items-center justify-center relative z-[3] ${shadow.lightShadow}`}
    >
      <VerifyLinkUI url={requestURL} />
    </div>
  );
};

export default page;
