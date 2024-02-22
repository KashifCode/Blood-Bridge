"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { axiosInstance as axios } from '@/app/axios-api/axios'
import { getAllUserEvents } from '@/app/axios-api/Endpoint'
import shadow from '@/app/components/shadow.module.css'
import toast from 'react-hot-toast'
import { Clock, MapPin } from 'lucide-react'

const UserEvents = () => {
    const [events, setEvents] = useState<any[]>([])
    const [filteredEvents, setFilteredEvents] = useState<any[]>([])

    useEffect(() => {
        const url = getAllUserEvents();
        axios.get(url, {
            withCredentials: true
        }).then(res => {
            setEvents(res.data.events)
            setFilteredEvents(res.data.events)
        }).catch(err => {
            toast.error(err?.response?.data?.message)
            console.log(err)
        })
    }, [])

    const handleMonthChange = (newCurrentMonth: string) => {
        if (newCurrentMonth === 'all') {
            setFilteredEvents(events)
        } else {
            setFilteredEvents(events.filter(event => (new Date(event?.eventDate?.substring(0, 10))?.toLocaleString('default', { month: 'short' })).toLowerCase() === newCurrentMonth))
        }
    }

    //Function to covert 24 hour time to 12 hour time in the format of hh:mm AM/PM
    const convertTo12Hour = (time: string) => {
        const [hours, minutes] = time.split(':');
        if (parseInt(hours) > 12) {
            return `${parseInt(hours) - 12}:${minutes} PM`;
        } else {
            return `${hours}:${minutes} AM`;
        }
    }

    return (
        <div className='w-full flex flex-col pl-[6%] pr-[3%] mt-12 2xl:!pr-[6%] 2xl:!justify-between mb-6 md:!mb-1 items-center gap-y-6'>
            <div className='w-full flex justify-between items-center'>
                <h1 className='font-PlayfairDisplayBold text-3xl text-black'>Events</h1>
                <select className='bg-red-700 outline-0 border-none text-[#E9DFDF] rounded-md py-1 px-2' onChange={(e) => handleMonthChange(e.target.value)}>
                    <option value='all'>All</option>
                    <option value='jan'>Janurary</option>
                    <option value='feb'>Feburary</option>
                    <option value='mar'>March</option>
                    <option value='apr'>April</option>
                    <option value='may'>May</option>
                    <option value='jun'>June</option>
                    <option value='jul'>July</option>
                    <option value='aug'>August</option>
                    <option value='sep'>September</option>
                    <option value='oct'>October</option>
                    <option value='nov'>November</option>
                    <option value='dec'>December</option>
                </select>
            </div>
            <div className='grid grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-3 2xl:!grid-cols-4 gap-x-8 gap-y-6'>
                {filteredEvents?.map((event, index) => (
                    <div key={index} className={`w-full flex flex-col ${shadow.lightShadow}`}>
                        <div className='w-full'>
                            <Image src={event?.image} alt={event?.eventName} width={300} height={212} className='!w-full !min-h-[212px] !object-cover rounded-t-lg' />
                        </div>
                        <div className={`w-full flex bg-white rounded-lg p-4 mb-4`}>
                            <div className='w-1/5 flex flex-col justify-center items-center'>
                                <p className='font-DMSansMedium text-base text-black'>{new Date(event?.eventDate?.substring(0, 10))?.toLocaleString('default', { month: 'short' })}</p>
                                <p className='font-DMSansMedium text-base text-black'>{new Date(event?.eventDate?.substring(0, 10))?.getDate()}</p>
                            </div>
                            <div className='w-4/5 flex flex-col gap-y-1'>
                                <p className='font-LatoMedium text-lg text-black'>{event?.eventName}</p>
                                <p className='font-LatoRegular text-sm text-black'>{event?.description}</p>
                                <div className='flex items-center gap-x-1'>
                                    <MapPin size={20} />
                                    <p className='font-LatoRegular text-base text-black'>{event?.venue}</p>
                                </div>
                                <div className='flex items-center gap-x-1'>
                                    <Clock size={18} />
                                    <p className='font-LatoRegular text-base text-black'>{convertTo12Hour(event?.eventTime)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UserEvents