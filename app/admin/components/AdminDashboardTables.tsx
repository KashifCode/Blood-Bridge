"use client"

import React, { useEffect, useState } from 'react'
import { axiosInstance as axios } from '@/app/axios-api/axios';
import { admGetAllBloodBanks, admGetAllUsers } from '@/app/axios-api/Endpoint';
import toast from 'react-hot-toast';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

const AdminDashboardTables = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [bloodBanks, setBloodBanks] = useState<any[]>([]);

    useEffect(() => {
        const bloodBanksUrl = admGetAllBloodBanks()
        const usersUrl = admGetAllUsers()

        axios.get(bloodBanksUrl).then((res) => {
            setBloodBanks(res.data.bloodBanks);
        }).catch((err) => {
            console.log(err);
            toast.error(err?.response?.data?.message || 'An error occurred');
        });

        axios.get(usersUrl).then((res) => {
            setUsers(res.data.users);
        }).catch((err) => {
            console.log(err);
            toast.error(err?.response?.data?.message || 'An error occurred');
        });

    }, []);

    return (
        <div className='flex items-start justify-between gap-x-12'>
            <div className='w-1/2'>
                <div className='flex items-center justify-between px-5 pt-5'>
                    <h3 className='pb-4 text-xl text-black font-LatoMedium'>Users</h3>
                    <Link href={'/admin/users'} className='flex items-center gap-x-1.5 py-0.5 pl-2 pr-0.5 rounded-md bg-darkRed text-white'><span>View All</span><ChevronRight size={20} /></Link>
                </div>
                <Table className="!rounded-lg overflow-hidden">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="!px-3 !py-1.5 w-[50px] bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium"></TableHead>
                            <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium">
                                Name
                            </TableHead>
                            <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium">
                                Type
                            </TableHead>
                            <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium">
                                CNIC
                            </TableHead>
                            <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium text-center">
                                City
                            </TableHead>
                            <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium">
                                Contact
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users && users.length > 0 ? (
                            users.slice(0, 10).map((user, index) => (
                                <TableRow key={index}>
                                    <TableCell className="text-center">{index + 1}</TableCell>
                                    <TableCell>{user?.firstName + " " + user?.lastName}</TableCell>
                                    <TableCell>{user?.bloodGroup}</TableCell>
                                    <TableCell>{user?.cnic}</TableCell>
                                    <TableCell className="text-center">
                                        {user?.city}
                                    </TableCell>
                                    <TableCell>
                                        {user?.contact}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center">
                                    No Users Found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className='w-1/2'>
                <div className='flex items-center justify-between px-5 pt-5'>
                    <h3 className='pb-4 text-xl text-black font-LatoMedium'>Blood Banks</h3>
                    <Link href={'/admin/bloodBanks'} className='flex items-center gap-x-1.5 py-0.5 pl-2 pr-0.5 rounded-md bg-darkRed text-white'><span>View All</span><ChevronRight size={20} /></Link>
                </div>
                <Table className="!rounded-lg overflow-hidden">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="!px-3 !py-1.5 w-[50px] bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium"></TableHead>
                            <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium">
                                Name
                            </TableHead>
                            <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium">
                                Address
                            </TableHead>
                            <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium">
                                Area
                            </TableHead>
                            <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium text-center">
                                City
                            </TableHead>
                            <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium">
                                Contact
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bloodBanks && bloodBanks.length > 0 ? (
                            bloodBanks.slice(0, 10).map((bloodBank, index) => (
                                <TableRow key={index}>
                                    <TableCell className="text-center">{index + 1}</TableCell>
                                    <TableCell>{bloodBank?.name}</TableCell>
                                    <TableCell>{bloodBank?.address}</TableCell>
                                    <TableCell>{bloodBank?.sector}</TableCell>
                                    <TableCell className="text-center">
                                        {bloodBank?.city}
                                    </TableCell>
                                    <TableCell>
                                        {bloodBank?.contact}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={9} className="text-center">
                                    No Blood Banks Found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default AdminDashboardTables