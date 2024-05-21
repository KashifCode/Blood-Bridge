"use client"

import React from 'react'
import Header from "@/app/header/Header";
import { isMobile } from "react-device-detect";
import ClientOnly from "@/app/components/ClientOnly";
import ViewOnPc from "@/app/components/ViewOnPc";

const RenderMobileOrPcBB = ({ children }: { children: React.ReactNode }) => {
    return (
        <ClientOnly>
            {isMobile && <ViewOnPc callFrom="Blood Bank" />}
            {!isMobile && (
                <>
                    <Header />
                    <div className="flex-1">{children}</div>
                </>)}
        </ClientOnly>
    )
}

export default RenderMobileOrPcBB