"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const EventsNav = () => {
    const { push } = useRouter();

    const handleRedirect = (path: string) => {
        push(path);
    };

    const colors = [
        "#DF372A",
        "#1F78D4",
        "#5E4DAA",
        "#003E7A",
        "#33C02C",
        "#FF9A99",
        "#A6CEFF",
        "#B2EF8A",
    ];

    return (
        <div className="w-3/4 mx-auto flex flex-col mt-2.5 gap-y-5">
            <div className="w-max flex flex-col gap-y-5 mt-6 mb-3">
                <div
                    className="w-full bg-[#E3E3E3] rounded-[10px] py-5 flex gap-x-32 items-center justify-between px-6 cursor-pointer"
                    onClick={() => handleRedirect("/admin/events/records/?type=all")}
                >
                    <div className="flex gap-x-3 items-center">
                        <p className="text-black font-LatoBold text-lg">
                            Events
                        </p>
                    </div>
                    <ChevronRight size={24} color={"black"} />
                </div>
                <div
                    className="w-full bg-[#E3E3E3] rounded-[10px] py-5 flex gap-x-32 items-center justify-between px-6 cursor-pointer"
                    onClick={() => handleRedirect("/admin/events/records/?type=upcomming")}
                >
                    <div className="flex gap-x-3 items-center">
                        <p className="text-black font-LatoBold text-lg">Upcomming Events</p>
                    </div>
                    <ChevronRight size={24} color={"black"} />
                </div>
            </div>
        </div>
    );
};

export default EventsNav;