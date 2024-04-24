"use client"

import React, { useEffect, useState } from 'react'
import { axiosInstance as axios } from '@/app/axios-api/axios';
import { admGetAllDonations } from '@/app/axios-api/Endpoint';
import toast from 'react-hot-toast';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const DonationsRecord = () => {
    const [donations, setDonations] = useState<any[]>([]);

    useEffect(() => {
        const donationsUrl = admGetAllDonations()

        axios.get(donationsUrl).then((res) => {
            setDonations(res.data.bloodDonations);
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
                        <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium text-center">
                            Blood Group
                        </TableHead>
                        <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium text-center">
                            Age
                        </TableHead>
                        <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium text-center">
                            Donation Date
                        </TableHead>
                        <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium text-center">
                            Contact
                        </TableHead>
                        <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium text-center">
                            Blood Bank
                        </TableHead>
                        <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium text-center">
                            Donation Status
                        </TableHead>
                        <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium text-center">
                            Disease
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {donations && donations.length > 0 ? (
                        donations.map((donation, index) => (
                            <TableRow key={index}>
                                <TableCell className="text-center">{index + 1}</TableCell>
                                <TableCell>{donation?.name}</TableCell>
                                <TableCell className='text-center'>{donation?.bloodGroup}</TableCell>
                                <TableCell className="text-center">{donation?.age}</TableCell>
                                <TableCell className='text-center'>{donation?.donationDate.split('T')[0]}</TableCell>
                                <TableCell className='text-center'>{donation?.contact}</TableCell>
                                <TableCell className='text-center'>{donation?.bloodBank?.name}</TableCell>
                                <TableCell className='text-center'>{donation?.donationStatus}</TableCell>
                                <TableCell className='text-center'>{donation?.disease}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={9} className="text-center">
                                No Users Found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default DonationsRecord