"use client";

import React from "react";
import Header from "@/app/header/Header";
import { isMobile } from "react-device-detect";
import ClientOnly from "@/app/components/ClientOnly";
import ViewOnPc from "@/app/components/ViewOnPc";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col min-h-[100vh]">
      <ClientOnly>
        {isMobile && <ViewOnPc />}
        {!isMobile && (
          <>
            <Header />
            <div className="flex-1">{children}</div>
          </>)}
      </ClientOnly>
    </div>
  );
}
