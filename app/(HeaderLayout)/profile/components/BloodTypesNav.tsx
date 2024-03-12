"use client"

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { axiosInstance as axios } from '@/app/axios-api/axios'
import { BBgetAllBloodTypes } from '@/app/axios-api/Endpoint'
import { ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const BloodTypesNav = () => {
    const { push } = useRouter();
    const [BloodTypes, setBloodTypes] = useState<any>([])

    useEffect(() => {
        const url = BBgetAllBloodTypes();
        axios.get(url, {
            withCredentials: true,
        }).then((res) => {
            setBloodTypes(res.data.bloodTypes)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    const handleRedirect = (path: string) => {
        push(path)
    }

    const colors = ['#DF372A', '#1F78D4', '#5E4DAA', '#003E7A', '#33C02C', '#FF9A99', '#A6CEFF', '#B2EF8A']

    return (
        <div className='w-full flex flex-col mt-2.5 gap-y-5'>
            <Button className='!w-max font-LatoBold bg-red-700 hover:!bg-red-800 text-white text-lg rounded-3xl'>
                Generate Report
            </Button>
            <div>
                <p className='text-black text-xl font-LatoMedium'>Blood</p>
                <div className='flex items-center flex-wrap gap-x-5 gap-y-4 mt-2.5'>
                    {BloodTypes.map((type: any, index: number) => (
                        <div key={index} className={`w-32 h-24 rounded-xl flex flex-col items-center justify-center gap-y-2.5`} style={{ backgroundColor: colors[index] }}>
                            <p className='text-white text-2xl !leading-7 font-PlayfairDisplayBold text-center'>{type.bloodGroup}</p>
                            <div className='bg-[#D9D9D9] rounded px-5 py-0.5'>
                                <p className='text-black font-PlayfairDisplayBold text-center'>{type.stock} Bags</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='w-max flex flex-col gap-y-5 mt-6 mb-3'>
                    <div className='w-full bg-[#E3E3E3] rounded-[10px] py-5 flex gap-x-32 items-center justify-between px-6 cursor-pointer' onClick={() => handleRedirect("/profile/bloodBank/blood/blood-donations")}>
                        <div className='flex gap-x-3 items-center'>
                            <p className='text-black font-LatoBold text-lg'>Blood Donations</p>
                        </div>
                        <ChevronRight size={24} color={'black'} />
                    </div>
                    <div className='w-full bg-[#E3E3E3] rounded-[10px] py-5 flex gap-x-32 items-center justify-between px-6 cursor-pointer' onClick={() => handleRedirect("/profile/bloodBank/blood/blood-requests")}>
                        <div className='flex gap-x-3 items-center'>
                            <p className='text-black font-LatoBold text-lg'>Blood Requests</p>
                        </div>
                        <ChevronRight size={24} color={'black'} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BloodTypesNav