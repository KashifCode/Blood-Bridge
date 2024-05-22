"use client"

import React, { useEffect, useState } from 'react'
import { axiosInstance as axios } from '@/app/axios-api/axios';
import { admGetAllDonations, admGetAllRequests, admGetAllBloodBanks, admBloodBankActions, admGetAllBloodTypes, admVerifyBloodBank } from '@/app/axios-api/Endpoint';
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
import cx from 'classnames'
import { Ban, ChevronLeft, Eye, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AdminBloodBankChart from './AdminBloodBanksChart';

const BloodBanksRecord = ({ isFromBlocked }: { isFromBlocked?: boolean }) => {
    const [bloodBanks, setBloodBanks] = useState<any[]>([]);
    const [donations, setDonations] = useState<any[]>([]);
    const [requests, setRequests] = useState<any[]>([]);
    const [bloodTypes, setBloodTypes] = useState<any[]>([]);

    useEffect(() => {
        const bloodBanksUrl = admGetAllBloodBanks()
        const donationsUrl = admGetAllDonations()
        const requestsUrl = admGetAllRequests()
        const bloodTypesUrl = admGetAllBloodTypes()

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

        axios.get(bloodBanksUrl).then((res) => {
            setBloodBanks(res.data.bloodBanks);
        }).catch((err) => {
            console.log(err);
            toast.error(err?.response?.data?.message || 'An error occurred');
        });

        axios.get(bloodTypesUrl).then((res) => {
            setBloodTypes(res.data.bloodTypes)
        }).catch((err) => {
            console.log(err);
            toast.error(err?.response?.data?.message || 'An error occurred');
        });

    }, []);

    //count total bags, Pending, Accomplished and Rejected requests & donations for each Blood Banks
    bloodBanks.forEach((bloodBank) => {
        let pendingCount = 0;
        let accomplishedCount = 0;
        let rejectedCount = 0;
        let totalBags = 0;

        donations.forEach((donation) => {
            if (donation?.bloodBank?._id === bloodBank._id) {
                if (donation.donationStatus === "Completed") {
                    accomplishedCount++;
                } else if (donation?.donationStatus === "Rejected") {
                    rejectedCount++;
                } else {
                    pendingCount++;
                }
            }
        });
        requests.forEach((request) => {
            if (request?.bloodBank?._id === bloodBank._id) {
                if (request.reqStatus === "Completed") {
                    accomplishedCount++;
                } else if (request?.reqStatus === "Rejected") {
                    rejectedCount++;
                } else {
                    pendingCount++;
                }
            }
        });

        bloodTypes.forEach((bloodType) => {
            if (bloodType?.bloodBank === bloodBank._id) {
                totalBags += bloodType?.stock;
            }
        })

        bloodBank.pendingCount = pendingCount;
        bloodBank.accomplishedCount = accomplishedCount;
        bloodBank.rejectedCount = rejectedCount;
        bloodBank.totalBags = totalBags;
    });

    const handleDeleteBloodBank = (bloodBank: string) => {
        const url = admBloodBankActions() + bloodBank;
        axios.delete(url).then((res) => {
            setBloodBanks(bloodBanks.filter((aBloodBank) => aBloodBank._id !== bloodBank));
            toast.success(res.data.message || 'Blood Bank Deleted Successfully');
        }).catch((err) => {
            console.log(err);
            toast.error(err?.response?.data?.message || 'An error occurred');
        })
    }

    const handleBlockBloodBank = (bloodBank: string, status: string) => {
        const url = admBloodBankActions() + bloodBank;
        axios.put(url, { status }).then((res) => {
            if (isFromBlocked) {
                setBloodBanks(bloodBanks.filter((aBloodBank) => aBloodBank._id !== bloodBank && aBloodBank.block === true));
            } else {
                setBloodBanks(bloodBanks.filter((aBloodBank) => aBloodBank._id !== bloodBank && aBloodBank.block === false));
            }
            toast.success(res.data.message);
        }).catch((err) => {
            console.log(err);
            toast.error(err?.response?.data?.message || 'An error occurred');
        })
    }

    const handleVerifyBloodBank = (bloodBank: string) => {
        const url = admVerifyBloodBank() + bloodBank;
        axios.put(url, { status: "verified" }).then((res) => {
            setBloodBanks(bloodBanks.map((aBloodBank) => {
                if (aBloodBank._id === bloodBank) {
                    aBloodBank.accountVerified = "verified";
                }
                return aBloodBank;
            }));
            toast.success(res.data.message);
        }).catch((err) => {
            console.log(err);
            toast.error(err?.response?.data?.message || 'An error occurred');
        })
    }

    return (
        <div className='w-full flex flex-col gap-y-8'>
            <div className='flex items-center justify-between px-5 pt-5'>
                <h3 className='pb-4 text-xl text-black font-LatoMedium'>{!isFromBlocked ? <span>Blood Banks</span> :
                    <div className='flex items-center gap-x-1'>
                        <Link href={"/admin/bloodBanks"}><ChevronLeft size={22} /></Link>
                        <span>Blocked Blood Banks</span>
                    </div>
                }</h3>
                <Link href={'/admin/bloodBanks/blocked'} className='flex items-center gap-x-1.5 text-darkRed'>Blocked Blood Banks</Link>
            </div>
            <div className='w-5/6 mx-auto'>
                <AdminBloodBankChart />
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
                        <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium text-center">
                            Area
                        </TableHead>
                        <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium text-center">
                            City
                        </TableHead>
                        <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium">
                            Contact
                        </TableHead>
                        <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium text-center">
                            Total Bags
                        </TableHead>
                        <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium text-center">
                            Accomplished
                        </TableHead>
                        <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium text-center">
                            Pending
                        </TableHead>
                        <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium text-center">
                            Rejected
                        </TableHead>
                        <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium text-center">
                            Verify
                        </TableHead>
                        <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium text-center">
                            Status
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {bloodBanks && bloodBanks.length > 0 ? (
                        (isFromBlocked ? bloodBanks.filter((bloodBank) => bloodBank.block === true) : bloodBanks.filter((bloodBank) => bloodBank.block === false)).map((bloodBank, index) => (
                            <TableRow key={index}>
                                <TableCell className="text-center">{index + 1}</TableCell>
                                <TableCell>{bloodBank?.name}</TableCell>
                                <TableCell>{bloodBank?.address || "Nil"}</TableCell>
                                <TableCell className="text-center">{bloodBank?.sector || "Nil"}</TableCell>
                                <TableCell className='text-center'>{bloodBank?.city || "Nil"}</TableCell>
                                <TableCell>{bloodBank?.contact}</TableCell>
                                <TableCell className='text-center'>{bloodBank?.totalBags}</TableCell>
                                <TableCell className='text-center'>{bloodBank?.accomplishedCount}</TableCell>
                                <TableCell className='text-center'>{bloodBank?.pendingCount}</TableCell>
                                <TableCell className='text-center'>{bloodBank?.rejectedCount}</TableCell>
                                <TableCell className={cx('text-center', { "text-green-600": bloodBank?.accountVerified !== "pending" })}>
                                    {bloodBank?.accountVerified !== "pending" ? "Verified" :
                                        <Button className='!h-auto !w-max py-1.5 px-3 !bg-red-700' onClick={() => handleVerifyBloodBank(bloodBank._id)}>Verify</Button>
                                    }
                                </TableCell>
                                <TableCell>
                                    <div className='flex items-center justify-center gap-x-3'>
                                        {/* <Link href={`/admin/bloodBanks/${bloodBank._id}?ac=${bloodBank?.accomplishedCount}&pc=${bloodBank?.pendingCount}&rc=${bloodBank?.rejectedCount}&tb=${bloodBank?.totalBags}`}><Eye size={20} /></Link> */}
                                        <Ban className='cursor-pointer' size={20} onClick={() => handleBlockBloodBank(bloodBank._id, isFromBlocked ? "unblocked" : "blocked")} />
                                        <Trash2 className='cursor-pointer' size={20} onClick={() => handleDeleteBloodBank(bloodBank._id)} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={12} className="text-center">
                                No Blood Banks Found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default BloodBanksRecord