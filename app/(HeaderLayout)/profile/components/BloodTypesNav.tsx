"use client"

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { axiosInstance as axios } from '@/app/axios-api/axios'
import { BBgetAllBloodTypes } from '@/app/axios-api/Endpoint'

const BloodTypesNav = () => {
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
                        <div key={index} className={`w-32 h-24 rounded-xl flex flex-col items-center justify-center gap-y-2.5`} style={{backgroundColor: colors[index]}}>
                            <p className='text-white text-2xl !leading-7 font-PlayfairDisplayBold text-center'>{type.bloodGroup}</p>
                            <div className='bg-[#D9D9D9] rounded px-5 py-0.5'>
                                <p className='text-black font-PlayfairDisplayBold text-center'>{type.stock} Bags</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BloodTypesNav