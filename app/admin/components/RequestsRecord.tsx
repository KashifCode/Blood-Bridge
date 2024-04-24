"use client"

import React, { useEffect, useState } from 'react'
import { axiosInstance as axios } from '@/app/axios-api/axios';
import { admGetAllRequests } from '@/app/axios-api/Endpoint';
import toast from 'react-hot-toast';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const RequestsRecord = () => {
    const [requests, setRequests] = useState<any[]>([]);

    useEffect(() => {
        const requestsUrl = admGetAllRequests()

        axios.get(requestsUrl).then((res) => {
            setRequests(res.data.bloodRequests);
        }).catch((err) => {
            console.log(err);
            toast.error(err?.response?.data?.message || 'An error occurred');
        });

    }, []);

    return (
        <div className='flex flex-col gap-y-8'>
            <Table className="!rounded-lg overflow-hidden">
                <TableHeader>
                    <TableRow>
                        <TableHead className="!px-3 !py-1.5 w-[50px] bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium"></TableHead>
                        <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium">
                            Name
                        </TableHead>
                        <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium">
                            Blood Group
                        </TableHead>
                        <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium text-center">
                            Bags
                        </TableHead>
                        <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium text-center">
                            Blood Needed
                        </TableHead>
                        <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium text-center">
                            Contact
                        </TableHead>
                        <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium text-center">
                            Blood Bank
                        </TableHead>
                        <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium text-center">
                            Request Status
                        </TableHead>
                        <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium text-center">
                            Exchanged Bags
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {requests && requests.length > 0 ? (
                        requests.map((request, index) => (
                            <TableRow key={index}>
                                <TableCell className="text-center">{index + 1}</TableCell>
                                <TableCell>{request?.name}</TableCell>
                                <TableCell>{request?.bloodGroup?.bloodGroup}</TableCell>
                                <TableCell className="text-center">{request?.bloodBags}</TableCell>
                                <TableCell className='text-center'>{request?.bloodNeededOn?.split('T')[0]}</TableCell>
                                <TableCell className='text-center'>{request?.contact}</TableCell>
                                <TableCell className='text-center'>{request?.bloodBank?.name}</TableCell>
                                <TableCell className='text-center'>{request?.reqStatus}</TableCell>
                                <TableCell>
                                    <div className='flex items-center justify-center gap-x-3'>
                                        {request?.receivedBlood.length > 0 ? (
                                            <div className='flex items-center flex-wrap gap-x-1.5 gap-y-1'>
                                                {request?.receivedBlood.map((blood: any, ind: number) => (
                                                    <span key={ind} className='text-black bg-slate-200 rounded p-1'>{blood}</span>
                                                ))}
                                            </div>
                                        ): <>No Exchange</>}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={9} className="text-center">
                                No Requests Found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default RequestsRecord