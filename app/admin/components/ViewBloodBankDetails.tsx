"use client"

import React, { useEffect, useState } from 'react'
import { axiosInstance as axios } from '@/app/axios-api/axios'
import { admBloodBankActions, admGetAllBloodTypes } from '@/app/axios-api/Endpoint'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const ViewBloodBankDetails = ({ id }: { id: string }) => {
    const [bloodBank, setBloodBank] = useState<any>(null)
    const [bloodTypes, setBloodTypes] = useState<any[]>([])

    const searchParams = useSearchParams();

    useEffect(() => {
        const url = admBloodBankActions() + id;
        const bloodTypesUrl = admGetAllBloodTypes();

        axios.get(url).then((res) => {
            console.log(res.data.bloodBank);
            setBloodBank(res.data.bloodBank);
        }).catch((err) => {
            console.log(err);
            toast.error(err?.response?.data?.message || 'An error occurred');
        })

        axios.get(bloodTypesUrl).then((res) => {
            console.log(res.data.bloodTypes);
            setBloodTypes(res.data.bloodTypes.filter((bloodType: any) => bloodType?.bloodBank === id));
        }).catch((err) => {
            console.log(err);
            toast.error(err?.response?.data?.message || 'An error occurred');
        })

    }, [id])

    return (
        <div className='flex flex-col gap-y-6'>
            <h3 className='text-xl font-LatoBold text-black flex items-center gap-x-2'><Link href={"/admin/bloodBanks"}><ChevronLeft size={22} /></Link><span>Blood Bank Details</span></h3>
            <div className='w-full flex items-center justify-between border border-solid border-[#989898] rounded-xl px-7 py-5'>
                <div className='w-3/5 flex flex-col gap-y-4'>
                    <div>
                        <p className='text-[15px] text-black'>Name</p>
                        <h4 className='text-lg text-black font-medium'>{bloodBank?.name}</h4>
                    </div>
                    <div>
                        <p className='text-[15px] text-black'>Address</p>
                        <h4 className='text-lg text-black font-medium'>{bloodBank?.address}</h4>
                    </div>
                    <div>
                        <p className='text-[15px] text-black'>Total Bags</p>
                        <h4 className='text-lg text-black font-medium'>{searchParams.get('tb')}</h4>
                    </div>
                    <div>
                        <p className='text-[15px] text-black'>Area</p>
                        <h4 className='text-lg text-black font-medium'>{bloodBank?.sector}</h4>
                    </div>
                    <div>
                        <p className='text-[15px] text-black'>Contact</p>
                        <h4 className='text-lg text-black font-medium'>{bloodBank?.contact}</h4>
                    </div>
                    <div>
                        <p className='text-[15px] text-black'>City</p>
                        <h4 className='text-lg text-black font-medium'>{bloodBank?.city}</h4>
                    </div>
                    <div>
                        <p className='text-[15px] text-black'>Accomplished</p>
                        <h4 className='text-lg text-black font-medium'>{searchParams.get('ac')}</h4>
                    </div>
                    <div>
                        <p className='text-[15px] text-black'>Pending</p>
                        <h4 className='text-lg text-black font-medium'>{searchParams.get('pc')}</h4>
                    </div>
                    <div>
                        <p className='text-[15px] text-black'>Rejected</p>
                        <h4 className='text-lg text-black font-medium'>{searchParams.get('rc')}</h4>
                    </div>
                    <div>
                        <p className='text-[#686870]'>Verification Status</p>
                        <h4 className='text-lg text-black font-medium'>{bloodBank?.accountVerified}</h4>
                    </div>
                    <div>
                        <p className='text-[#686870]'>Status</p>
                        <h4 className='text-lg text-black font-medium'>{bloodBank?.isActive ? "Active" : "Inactive"}</h4>
                    </div>
                </div>

                <div className='w-2/5 mr-[5%]'>
                    <Table className="!rounded-lg overflow-hidden">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium">
                                    Blood Type
                                </TableHead>
                                <TableHead className="!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium">
                                    Bags
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bloodTypes && bloodTypes.length > 0 ? (
                                bloodTypes.map((bloodType, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{bloodType?.bloodGroup}</TableCell>
                                        <TableCell>{bloodType?.stock}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={9} className="text-center">
                                        {bloodTypes.length === 0 ? <>No Blood Type Records</> : <>Loading...</>}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default ViewBloodBankDetails