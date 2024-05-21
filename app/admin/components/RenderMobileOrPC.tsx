"use client"

import React from 'react'
import Header from "@/app/header/Header";
import shadow from "@/app/components/shadow.module.css";
import AdminNavigation from "@/app/admin/components/AdminNavigation";
import { isMobile } from "react-device-detect";
import ClientOnly from "@/app/components/ClientOnly";
import ViewOnPc from "@/app/components/ViewOnPc";

const RenderMobileOrPC = ({ children }: { children: React.ReactNode }) => {
    return (
        <ClientOnly>
            {isMobile && <ViewOnPc callFrom={"Admin"} />}
            {!isMobile && (
                <>
                    <Header />
                    <div className="flex-1">
                        <div className="w-full flex">
                            <div
                                className={`relative z-[5] min-w-[164px] bg-white border-t border-black ${shadow.lightShadow} ${shadow.bloodBankNavHeight}`}
                            >
                                <AdminNavigation />
                            </div>
                            <div
                                className={`w-[90%] ${shadow.BBPanelScrollHeight} overflow-y-scroll`}
                            >
                                {children}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </ClientOnly>
    )
}

export default RenderMobileOrPC