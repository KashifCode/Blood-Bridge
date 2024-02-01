"use client"

import React, { useEffect } from 'react'
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
import { modifyEvent, getAllEvents } from '@/app/axios-api/Endpoint'
import AddNewEvent from '@/app/(HeaderLayout)/profile/components/AddNewEvent'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { useDispatch } from 'react-redux'
import { updateAllEvents } from '@/redux/features/allEvents'
import { useBBSelector } from '@/redux/store'

const EventsStatistics = () => {
    const allEvents = useBBSelector(state => state.allEvents.value.events)
    const dispatch = useDispatch()

    useEffect(() => {
        const url = getAllEvents();
        axios.get(url, {
            withCredentials: true
        }).then(res => {
            dispatch(updateAllEvents({events: res.data.events} as any))
        }).catch(err => {
            toast.error(err?.response?.data?.message)
        })
    }, [dispatch])

    const handleEditEvent = (index: number) => {
        console.log(allEvents?.[index])
    }

    const handleDeleteEvent = (index: number) => {
        const eventToDelete = allEvents?.[index]
        const url = modifyEvent() + `?id=${eventToDelete._id}`;
        
        axios.delete(url, {
            withCredentials: true,
        })
        .then(res => {
            dispatch(updateAllEvents({events: allEvents?.filter((event) => event._id !== eventToDelete._id)} as any))
            toast.success(res?.data?.message)
        }).catch(err => {
            toast.error(err?.response?.data?.message)
            console.log(err)
        })
    }

    return (
        <div className='w-full h-full pb-5'>
            <div className='w-full flex gap-x-7 items-center'>
                <div className='py-3 px-4 rounded-xl bg-[#AE3C60] min-w-[155px]'>
                    <h3 className='font-PlayfairDisplayBold capitalize text-white text-xl leading-5'>Total Events</h3>
                    <h3 className='font-PlayfairDisplayBold capitalize text-white text-xl leading-5'>{allEvents?.length}</h3>
                </div>
                <div className='py-3 px-4 rounded-xl bg-[#DF473C] min-w-[155px]'>
                    <h3 className='font-PlayfairDisplayBold capitalize text-white text-xl leading-5'>Successfull</h3>
                    <h3 className='font-PlayfairDisplayBold capitalize text-white text-xl leading-5'>{allEvents?.filter((request) => request.reqStatus === 'Completed').length}</h3>
                </div>
                <div className='py-3 px-4 rounded-xl bg-[#F3C33C] min-w-[155px]'>
                    <h3 className='font-PlayfairDisplayBold capitalize text-white text-xl leading-5'>Pending</h3>
                    <h3 className='font-PlayfairDisplayBold capitalize text-white text-xl leading-5'>{allEvents?.filter((request) => request.reqStatus === 'Pending').length}</h3>
                </div>
                <div className='py-3 px-4 rounded-xl bg-[#267778] min-w-[155px]'>
                    <h3 className='font-PlayfairDisplayBold capitalize text-white text-xl leading-5'>Canceled</h3>
                    <h3 className='font-PlayfairDisplayBold capitalize text-white text-xl leading-5'>{allEvents?.filter((request) => request.reqStatus === 'Rejected').length}</h3>
                </div>
            </div>

            <p className='font-DMSansSemiBold text-slate-900 capitalize pb-1.5 pt-4 mt-4'>List of Events</p>
            <div className={`bg-white w-full flex gap-x-4 pb-4 px-2.5`}>
                <div className='w-[60%]'>
                    <Table className={`overflow-hidden !rounded-lg ${shadow.lightShadow}`}>
                        <TableHeader>
                            <TableRow>
                                <TableHead className='!px-3 !py-1.5 w-[50px] bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium'></TableHead>
                                <TableHead className='!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium'>Name</TableHead>
                                <TableHead className='!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium'>Venue</TableHead>
                                <TableHead className='!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium'>Date</TableHead>
                                <TableHead className='!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium'>Time</TableHead>
                                <TableHead className='!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium'>Guests</TableHead>
                                <TableHead className='!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium text-center'>Notify</TableHead>
                                <TableHead className='!px-3 !py-1.5 bg-slate-50 !border !border-black !border-opacity-10 !h-auto !font-DMSansMedium text-center'>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {allEvents && allEvents.map((event, index) => (
                                <TableRow key={index}>
                                    <TableCell className="text-center">{index + 1}</TableCell>
                                    <TableCell>{event.eventName}</TableCell>
                                    <TableCell>{event.venue}</TableCell>
                                    <TableCell className='text-center'>{event.eventDate.split('T')[0]}</TableCell>
                                    <TableCell>{event.eventTime}</TableCell>
                                    <TableCell className='!grid !grid-cols-3 gap-1'>{event.guests.map((val: string, ind: number) => {
                                        return <span className='bg-slate-200 bg-opacity-80 p-1 rounded-md text-center' key={ind}>{val}</span>
                                    })}</TableCell>
                                    <TableCell className='underline text-[#00832C] font-DMSansMedium text-center'>Notify Users</TableCell>
                                    <TableCell className='flex flex-wrap justify-center items-center gap-x-6 gap-y-2'>
                                        <Button className='bg-red-700 hover:bg-red-600 text-white font-DMSansMedium text-sm !h-auto !py-1 !px-3 rounded-md' onClick={() => handleEditEvent(index)}>Edit</Button>
                                        <Button className='bg-red-700 hover:bg-red-600 text-white font-DMSansMedium text-sm !h-auto !py-1 !px-3 rounded-md' onClick={() => handleDeleteEvent(index)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className='w-[40%]'>
                    <AddNewEvent />
                </div>

            </div>

        </div>
    )
}

export default EventsStatistics