import React from 'react'
import EventsRecord from '@/app/admin/components/EventsRecord'

const page = () => {
    return (
        <div className='w-full pl-6 pr-[4%] py-5 flex flex-col gap-y-8'>
            <EventsRecord />
        </div>
    )
}

export default page