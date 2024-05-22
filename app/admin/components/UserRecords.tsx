"use client"

import React, { useEffect, useState } from 'react'
import { axiosInstance as axios } from '@/app/axios-api/axios';
import { admGetAllDonations, admGetAllRequests, admGetAllUsers, admUserActions } from '@/app/axios-api/Endpoint';
import toast from 'react-hot-toast';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Link from 'next/link';
import { Ban, ChevronLeft, Eye, Trash2 } from 'lucide-react';
import AdminUsersChart from '@/app/admin/components/AdminUsersChart';

const UserRecords = ({ isFromBlocked }: { isFromBlocked?: boolean }) => {
    const [users, setUsers] = useState<any[]>([]);
    const [donations, setDonations] = useState<any[]>([]);
    const [requests, setRequests] = useState<any[]>([]);

    useEffect(() => {
        const usersUrl = admGetAllUsers()
        const donationsUrl = admGetAllDonations()
        const requestsUrl = admGetAllRequests()

        axios.get(requestsUrl).then((res) => {
            setRequests(res.data.bloodRequests);
        }).catch((err) => {
            console.log(err);
            toast.error(err?.response?.data?.message || 'An error occurred');
        });

        axios.get(donationsUrl).then((res) => {
            setDonations(res.data.bloodDonations);
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

    //count donations and requests for each user
    users.forEach((user) => {
        let requestCount = 0;
        let donationCount = 0;
        donations.forEach((donation) => {
            if (donation?.user === user._id) {
                donationCount++;
            }
        });
        requests.forEach((request) => {
            if (request?.user === user._id) {
                requestCount++;
            }
        });
        user.donationCount = donationCount;
        user.requestCount = requestCount;
    });

    const handleDeleteUser = (user: string) => {
        const url = admUserActions() + user;
        axios.delete(url).then((res) => {
            setUsers(users.filter((aUser) => aUser._id !== user));
            toast.success(res.data.message || 'User Deleted Successfully');
        }).catch((err) => {
            console.log(err);
            toast.error(err?.response?.data?.message || 'An error occurred');
        })
    }

    const handleBlockUser = (user: string, status: string) => {
        const url = admUserActions() + user;
        axios.put(url, { status }).then((res) => {
            if(isFromBlocked) {
                setUsers(users.filter((aUser) => aUser._id !== user && aUser.block === true));
            } else {
                setUsers(users.filter((aUser) => aUser._id !== user && aUser.block === false));
            }
            console.log(res.data);
            toast.success(res.data.message);
        }).catch((err) => {
            console.log(err);
            toast.error(err?.response?.data?.message || 'An error occurred');
        })
    }

    return (
        <div className='flex flex-col gap-y-8'>
            <div className='flex items-center justify-between px-5 pt-4'>
                <h3 className='pb-4 text-xl text-black font-LatoMedium'>{!isFromBlocked ? <span>Users</span> :
                    <div className='flex items-center gap-x-1'>
                        <Link href={"/admin/users"}><ChevronLeft size={22} /></Link>
                        <span>Blocked Users</span>
                    </div>
                }</h3>
                <Link href={'/admin/users/blocked'} className='flex items-center gap-x-1.5 text-darkRed'>Blocked Users</Link>
            </div>
            <div className='w-5/6 mx-auto'>
                <AdminUsersChart />
            </div>
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
                            City
                        </TableHead>
                        <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium">
                            CNIC
                        </TableHead>
                        <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium">
                            Contact
                        </TableHead>
                        <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium text-center">
                            Donations
                        </TableHead>
                        <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium text-center">
                            Requests
                        </TableHead>
                        <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium text-center">
                            Status
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users && users.length > 0 ? (
                        (isFromBlocked ? users.filter((user) => user.block === true) : users.filter((user) => user.block === false)).map((user, index) => (
                            <TableRow key={index}>
                                <TableCell className="text-center">{index + 1}</TableCell>
                                <TableCell>{user?.firstName + " " + user?.lastName}</TableCell>
                                <TableCell>{user?.bloodGroup}</TableCell>
                                <TableCell className="text-center">{user?.city}</TableCell>
                                <TableCell>{user?.cnic}</TableCell>
                                <TableCell>{user?.contact}</TableCell>
                                <TableCell className='text-center'>{user?.donationCount}</TableCell>
                                <TableCell className='text-center'>{user?.requestCount}</TableCell>
                                <TableCell>
                                    <div className='flex items-center justify-center gap-x-3'>
                                        {/* <Link href={`/admin/users/${user._id}`}><Eye size={20} /></Link> */}
                                        <Ban className='cursor-pointer' size={20} onClick={() => handleBlockUser(user._id, isFromBlocked ? "unblocked" : "blocked")} />
                                        <Trash2 className='cursor-pointer' size={20} onClick={() => handleDeleteUser(user._id)} />
                                    </div>
                                </TableCell>
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

export default UserRecords