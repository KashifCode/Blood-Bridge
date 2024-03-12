"use client"

import React, { useState, useEffect } from 'react'
import shadow from '@/app/components/shadow.module.css'
import { axiosInstance as axios } from '@/app/axios-api/axios'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { BBgetAllBloodDonations } from '@/app/axios-api/Endpoint'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import AddNewEvent from '../../../components/AddNewEvent'
import EditDonation from './EditDonation'

const DonationStatistics = ({ selectedMonth, selectedType }: { selectedMonth: string, selectedType: string }) => {
    const [bloodDonations, setbloodDonations] = useState<any[]>()
    const [donationToEdit, setDonationToEdit] = React.useState<any>(null)
    const [isDonationEdit, setIsDonationEdit] = React.useState<boolean>(false)

    const handleEditDonation = (index: number) => {
        setDonationToEdit(bloodDonations?.[index]);
        setIsDonationEdit(true);
    }

    const handleAddDonation = () => {
        setIsDonationEdit(false);
    }
    
    const handleDeleteDonation = (index: number) => {
        console.log(bloodDonations?.[index])
    }

    useEffect(() => {
        const url = BBgetAllBloodDonations();
        axios.get(url, {
            withCredentials: true
        }).then(res => {
            console.log(selectedMonth, selectedType)
            if (selectedMonth === 'all' && (selectedType === 'All' || selectedType === 'all')) return setbloodDonations(res.data.bloodDonations)
            if (selectedMonth === 'all') return setbloodDonations(res.data.bloodDonations.filter((donation: any) => donation.bloodGroup === selectedType))
            if (selectedType === 'All' || selectedType === 'all') return setbloodDonations(res.data.bloodDonations.filter((donation: any) => new Date(donation.donationDate.split('T')[0]).toLocaleString('default', { month: 'short' }).toLowerCase() === selectedMonth))
            setbloodDonations(res.data.bloodDonations.filter((donation: any) => new Date(donation.donationDate.split('T')[0]).toLocaleString('default', { month: 'short' }).toLowerCase() === selectedMonth && donation.bloodGroup === selectedType))
        }).catch(err => {
            toast.error(err.response.data.message)
            console.log(err)
        })
    }, [selectedMonth, selectedType])

    return (
        <div className={`bg-white w-full flex gap-x-4 mt-2 py-4 px-2.5`}>
            <div className={`w-[60%] rounded-lg ${shadow.lightShadow}`}>
                <p className='font-DMSansSemiBold text-slate-900 capitalize pb-1.5'>List of Blood Donations</p>
                <Table className='!rounded-lg overflow-hidden'>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='!px-3 !py-1.5 w-[50px] bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium'></TableHead>
                            <TableHead className='!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium'>Name</TableHead>
                            <TableHead className='!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium'>Donation On</TableHead>
                            <TableHead className='!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium'>Phone</TableHead>
                            <TableHead className='!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium text-center'>Age</TableHead>
                            <TableHead className='!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium text-center'>Donation Type</TableHead>
                            <TableHead className='!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium'>Disease</TableHead>
                            <TableHead className='!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto text-center !font-DMSansMedium'>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className=''>

                        {bloodDonations && bloodDonations.length > 0 ?
                            <>
                                {bloodDonations.map((donation, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="text-center">{index + 1}</TableCell>
                                        <TableCell>{donation.name}</TableCell>
                                        <TableCell>{donation.donationDate.split('T')[0]}</TableCell>
                                        <TableCell>{donation.contact}</TableCell>
                                        <TableCell className='text-center'>{donation.age}</TableCell>
                                        <TableCell className='text-center'>{donation.bloodGroup}</TableCell>
                                        <TableCell className='text-center'>{donation.disease}</TableCell>
                                        <TableCell className='w-max'>
                                            <div className='flex flex-col gap-y-2 items-center justify-center'>
                                                <Button className='bg-red-700 hover:bg-red-600 text-white font-DMSansMedium text-sm !h-auto !py-1 !px-3 rounded-md' disabled={isDonationEdit ? true : false} onClick={() => handleEditDonation(index)}>Edit</Button>
                                                <Button className='bg-red-700 hover:bg-red-600 text-white font-DMSansMedium text-sm !h-auto !py-1 !px-3 rounded-md' disabled={isDonationEdit ? true : false} onClick={() => handleDeleteDonation(index)}>Remove</Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </> : <>
                                <TableRow>
                                    <TableCell colSpan={9} className='text-center'>No Donations Found</TableCell>
                                </TableRow>
                            </>
                        }
                    </TableBody>
                </Table>
            </div>
            <div className='w-[40%]'>
                {isDonationEdit && <EditDonation donationToEdit={donationToEdit} handleAddDonation={handleAddDonation} />}
                {!isDonationEdit && <AddNewEvent />}
            </div>
        </div>
    )
}

export default DonationStatistics