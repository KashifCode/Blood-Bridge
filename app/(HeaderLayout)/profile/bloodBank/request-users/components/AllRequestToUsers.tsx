"use client"

import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance as axios } from '@/app/axios-api/axios'
import { getAllRequestsToUsers } from '@/app/axios-api/Endpoint'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import shadow from '@/app/components/shadow.module.css'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import TickIcon from '@/globals/icons/TickIcon'
import CrossIcon from '@/globals/icons/CrossIcon'
// import { Report } from 'fluentReports/lib/esm/fluentReports.mjs';

const AllRequestToUsers = () => {
    const [selectedMonth, setSelectedMonth] = useState<string>("All")
    const [selectedBloodType, setSelectedBloodType] = useState<string>("All")

    const { data: allRecords, isLoading, isError } = useQuery({
        queryKey: ['allRequestToUsers'],
        queryFn: async () => {
            const url = getAllRequestsToUsers();
            const { data } = await axios.get(url)
            return data?.records
        }
    })

    const months = ["All", 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const bloodTypes = ["All", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

    const filteredRecords = allRecords?.filter((record: any) => {
        console.log(record.createdAt.split('T')[0].split('-')[1], (months.indexOf(selectedMonth) + 1).toString())
        if (selectedMonth === "All" && selectedBloodType === "All") return record
        if (selectedMonth === "All" && selectedBloodType !== "All") return record.bloodType === selectedBloodType
        if (selectedMonth !== "All" && selectedBloodType === "All") return record.createdAt.split('T')[0].split('-')[1] === months.indexOf(selectedMonth).toString().padStart(2, '0')
        if (selectedMonth !== "All" && selectedBloodType !== "All") return record.createdAt.split('T')[0].split('-')[1] === months.indexOf(selectedMonth).toString().padStart(2, '0') && record.bloodType === selectedBloodType
    })

    // // Our Simple Data in Object format:
    // const data = [{ name: 'Elijah', age: 18 }, { name: 'Abraham', age: 22 }, { name: 'Gavin', age: 28 }];

    // // Create a Report  
    // const rpt = new Report("Report.pdf")
    //     .pageHeader(["Employee Ages"])      // Add a simple (optional) page Header...        
    //     .data(data)	 			 	      // Add some Data (This is required)
    //     .detail([['name', 200], ['age', 50]]) // Layout the report in a Grid of 200px & 50px
    //     .render();

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>There was an error, Try Again!!</div>
    return (
        <div>
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-x-4'>
                    <Link href={'/profile/bloodBank/request-users'}>
                        <ChevronLeft size={24} color='black' strokeWidth={3} />
                    </Link>
                    <p className='text-[#2B2929] font-LatoBold text-lg'>Past Requests</p>
                </div>
                <div className='flex items-center gap-x-5'>
                    <Button className='bg-[#255E79] hover:bg-[#255E69] text-white font-LatoBold !py-1 rounded-3xl' onClick={() => console.log('Generate Report')}>Generate Report</Button>
                    <select
                        className='rounded-lg py-1 px-3 focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-0 bg-red-700 text-white transition-all'
                        value={selectedBloodType}
                        onChange={(e) => setSelectedBloodType(e.target.value)}
                    >
                        {bloodTypes.map((bloodType, index) => (
                            <option key={index} value={bloodType}>{bloodType}</option>
                        ))}
                    </select>
                    <select
                        className='rounded-lg py-1 px-3 focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-0 bg-red-700 text-white transition-all'
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                    >
                        {months.map((month, index) => (
                            <option key={index} value={month}>{month}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className={`bg-white w-full py-4 px-2.5 mt-4 rounded-lg ${shadow.lightShadow}`}>
                <p className='font-DMSansSemiBold text-slate-900 capitalize pb-1.5'>List of Blood Donations</p>
                <Table className='!rounded-lg overflow-hidden'>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='!px-3 !py-1.5 w-[50px] bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium'></TableHead>
                            <TableHead className='!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium text-center'>Blood Type</TableHead>
                            <TableHead className='!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium text-center'>Area</TableHead>
                            <TableHead className='!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium text-center'>Users</TableHead>
                            <TableHead className='!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium text-center'>Blood Banks</TableHead>
                            <TableHead className='!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium text-center'>Date</TableHead>
                            <TableHead className='!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium text-center'>Urgently</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className=''>
                        {filteredRecords.length > 0 ? filteredRecords.map((record: any, index: number) => (
                            <TableRow key={index}>
                                <TableCell className="text-center">{index + 1}</TableCell>
                                <TableCell className='text-center'>{record?.bloodType}</TableCell>
                                <TableCell className='text-center'>{record?.area}</TableCell>
                                <TableCell className='self-center'>
                                    <div className='flex items-center justify-center'>
                                        <TickIcon />
                                    </div>
                                </TableCell>
                                <TableCell className='grid place-items-center'>{record?.bloodBanks?.length > 0 ? <TickIcon /> : <CrossIcon />}</TableCell>
                                <TableCell className='text-center'>{record?.createdAt.split('T')[0]}</TableCell>
                                <TableCell className='flex items-center justify-center'>{record?.urgent ? <TickIcon /> : <CrossIcon />}</TableCell>
                            </TableRow>
                        )) :
                            <TableRow>
                                <TableCell colSpan={7} className='text-center'>No Records Found</TableCell>
                            </TableRow>}
                    </TableBody>
                </Table>

            </div>
        </div>
    )
}

export default AllRequestToUsers