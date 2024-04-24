import React from 'react'
import AdminEventsChart from '@/app/admin/components/AdminEventsChart'
import EventsNav from '@/app/admin/components/EventsNav'

const page = () => {
  return (
    <div className='w-full pl-6 pr-[4%] py-5 flex flex-col gap-y-8'>
      <AdminEventsChart />
      <EventsNav />
    </div>
  )
}

export default page