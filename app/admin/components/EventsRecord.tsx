"use client"

import React, { useEffect, useState } from 'react'
import { axiosInstance as axios } from '@/app/axios-api/axios';
import { admGetAllEvents } from '@/app/axios-api/Endpoint';
import toast from 'react-hot-toast';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useSearchParams } from 'next/navigation';
import { LucideChevronLeft } from 'lucide-react';
import Link from 'next/link';

const EventsRecord = () => {
    const [events, setEvents] = useState<any[]>([]);
    const searchParams = useSearchParams();
    const type = searchParams.get('type');

    useEffect(() => {
        const eventsUrl = admGetAllEvents()

        axios.get(eventsUrl).then((res) => {
            setEvents(type === "upcomming" ? res.data.events.filter((event: any) => new Date(event.eventDate) > new Date()): res.data.events);
        }).catch((err) => {
            console.log(err);
            toast.error(err?.response?.data?.message || 'An error occurred');
        });

    }, [type]);

    //convert 24hr time to 12hr time
    const convertTime = (time: string) => {
        const [hours, minutes] = time.split(':');
        return `${(parseInt(hours) % 12) || 12}:${minutes} ${parseInt(hours) >= 12 ? 'PM' : 'AM'}`;
    }

    return (
        <div className='flex flex-col gap-y-8'>
            <div>
                <div className='flex justify-between items-center'>
                    <Link href={"/admin/events"} className='w-max flex items-center gap-x-1.5 pb-2'><LucideChevronLeft /> <span>Back</span></Link>
                    {type !== "upcomming" ? <Link href={"/admin/events/records/?type=upcomming"} className='w-max text-lg pb-2 text-[#005C9F]'>Upcomming Events</Link>:
                    <Link href={"/admin/events/records/?type=all"} className='w-max text-lg pb-2 text-[#005C9F]'>All Events</Link>}
                </div>
                <h3 className='font-LatoMedium text-black text-xl capitalize'>{type !== "upcomming" ? "Events": "Upcomming Events"}</h3>
            </div>
            <Table className="!rounded-lg overflow-hidden">
                <TableHeader>
                    <TableRow>
                        <TableHead className="!px-3 !py-1.5 w-[50px] bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium"></TableHead>
                        <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium">
                            Name
                        </TableHead>
                        <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium text-center">
                            Venue
                        </TableHead>
                        <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium text-center">
                            Time
                        </TableHead>
                        <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium text-center">
                            Date
                        </TableHead>
                        <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium">
                            Host
                        </TableHead>
                        <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium text-center">
                            Guests
                        </TableHead>
                        <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium text-center max-w-[350px]">
                            Description
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {events && events.length > 0 ? (
                        events.map((event, index) => (
                            <TableRow key={index}>
                                <TableCell className="text-center">{index + 1}</TableCell>
                                <TableCell>{event?.eventName}</TableCell>
                                <TableCell className='text-center'>{event?.venue}</TableCell>
                                <TableCell className="text-center">{convertTime(event?.eventTime)}</TableCell>
                                <TableCell className='text-center'>{event?.eventDate.split('T')[0]}</TableCell>
                                <TableCell>{event?.bloodBank?.name}</TableCell>
                                <TableCell>
                                    {event?.guests.length > 0 ? (
                                        <div className='flex flex-col gap-y-1.5 items-center justify-center'>
                                            {event?.guests.map((guest: any, index: number) => (
                                                <span key={index} className='py-1 px-3 bg-slate-200 rounded w-max'>{guest}</span>
                                            ))}
                                        </div>
                                    ) : <>No Guests</>
                                    }
                                </TableCell>
                                <TableCell className='text-center max-w-[350px]'>{event?.description}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={8} className="text-center">
                                No Events Found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default EventsRecord