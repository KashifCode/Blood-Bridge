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
import { modifyEvent, getAllEvents, eventNotifyUsers } from '@/app/axios-api/Endpoint'
import AddNewEvent from '@/app/(HeaderLayout)/profile/components/AddNewEvent'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { useDispatch } from 'react-redux'
import { updateAllEvents } from '@/redux/features/allEvents'
import { useBBSelector } from '@/redux/store'
import EditEvent from '@/app/(HeaderLayout)/profile/components/EditEvent'

const EventsStatistics = () => {
    const allEvents = useBBSelector(state => state.allEvents.value.events)
    const dispatch = useDispatch()
    const [eventToEdit, setEventToEdit] = React.useState<any>(null)
    const [isEventEdit, setIsEventEdit] = React.useState<boolean>(false)

    useEffect(() => {
        const url = getAllEvents();
        axios.get(url, {
            withCredentials: true
        }).then(res => {
            dispatch(updateAllEvents({ events: res.data.events } as any))
        }).catch(err => {
            toast.error(err?.response?.data?.message)
        })
    }, [dispatch])

    const handleEditEvent = (index: number) => {
        setEventToEdit(allEvents?.[index]);
        setIsEventEdit(true);
    }

    const handleAddEvent = () => {
        setIsEventEdit(false);
    }

    const handleDeleteEvent = (index: number) => {
        const eventToDelete = allEvents?.[index]
        const url = modifyEvent() + `?id=${eventToDelete._id}`;

        axios.delete(url, {
            withCredentials: true,
        })
            .then(res => {
                dispatch(updateAllEvents({ events: allEvents?.filter((event) => event._id !== eventToDelete._id) } as any))
                toast.success(res?.data?.message)
            }).catch(err => {
                toast.error(err?.response?.data?.message)
                console.log(err)
            })
    }

    const handleNotifyUsers = (index: number) => {
        const eventId = allEvents?.[index]._id;
        const url = eventNotifyUsers() + `?id=${eventId}`;
        axios.get(url, {
            withCredentials: true
        }).then(res => {
            toast.success(res?.data?.message)
        }).catch(err => {
            toast.error(err?.response?.data?.message)
        })
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

    useEffect(() => {
    }, [isEventEdit])

    return (
        <div className='w-full h-full pb-5'>
            <div className='w-full flex gap-x-7 items-center'>
                <div className='py-3 px-4 rounded-xl bg-[#AE3C60] min-w-[155px]'>
                    <h3 className='font-PlayfairDisplayBold capitalize text-white text-xl leading-5'>Total Events</h3>
                    <h3 className='font-PlayfairDisplayBold capitalize text-white text-xl leading-5'>{allEvents?.length}</h3>
                </div>
                <div className='py-3 px-4 rounded-xl bg-[#DF473C] min-w-[155px]'>
                    <h3 className='font-PlayfairDisplayBold capitalize text-white text-xl leading-5'>Successfull</h3>
                    <h3 className='font-PlayfairDisplayBold capitalize text-white text-xl leading-5'>{allEvents?.filter((event) => event.eventDate < (new Date()).toISOString()).length}</h3>
                </div>
                <div className='py-3 px-4 rounded-xl bg-[#F3C33C] min-w-[155px]'>
                    <h3 className='font-PlayfairDisplayBold capitalize text-white text-xl leading-5'>Pending</h3>
                    <h3 className='font-PlayfairDisplayBold capitalize text-white text-xl leading-5'>{allEvents?.filter((event) => event.eventDate >= (new Date()).toISOString()).length}</h3>
                </div>
                {/* <div className='py-3 px-4 rounded-xl bg-[#267778] min-w-[155px]'>
                    <h3 className='font-PlayfairDisplayBold capitalize text-white text-xl leading-5'>Canceled</h3>
                    <h3 className='font-PlayfairDisplayBold capitalize text-white text-xl leading-5'>{allEvents?.length}</h3>
                </div> */}
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
                                    <TableCell>{event?.eventName}</TableCell>
                                    <TableCell>{event?.venue}</TableCell>
                                    <TableCell className='text-center'>{event?.eventDate?.split('T')[0]}</TableCell>
                                    <TableCell className='w-max'>{convertTo12Hour(event?.eventTime)}</TableCell>
                                    <TableCell className='!grid !grid-col-1 gap-1'>{event?.guests?.map((val: string, ind: number) => {
                                        return <span className='bg-slate-200 bg-opacity-80 p-1 rounded-md text-center w-max' key={ind}>{val}</span>
                                    })}</TableCell>
                                    <TableCell className='underline text-[#00832C] font-DMSansMedium text-center min-w-max cursor-pointer' onClick={() => handleNotifyUsers(index)}>Notify Users</TableCell>
                                    <TableCell className='w-max'>
                                        <div className='flex flex-col gap-y-2 items-center justify-center'>
                                            <Button className='bg-red-700 hover:bg-red-600 text-white font-DMSansMedium text-sm !h-auto !py-1 !px-3 rounded-md' disabled={isEventEdit ? true : false} onClick={() => handleEditEvent(index)}>Edit</Button>
                                            <Button className='bg-red-700 hover:bg-red-600 text-white font-DMSansMedium text-sm !h-auto !py-1 !px-3 rounded-md' disabled={isEventEdit ? true : false} onClick={() => handleDeleteEvent(index)}>Delete</Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className='w-[40%]'>
                    {isEventEdit && <EditEvent eventToEdit={eventToEdit} handleAddEvent={handleAddEvent}/>}
                    {!isEventEdit && <AddNewEvent />}
                </div>

            </div>

        </div>
    )
}

export default EventsStatistics