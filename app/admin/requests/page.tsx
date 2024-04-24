import React from 'react'
import RequestsRecord from '@/app/admin/components/RequestsRecord'
import AdminRequestsChart from '@/app/admin/components/AdminRequestsChart'

const page = () => {
  return (
    <div className='w-full pl-6 pr-[4%] py-5 flex flex-col gap-y-8'>
      <AdminRequestsChart />
      <RequestsRecord />
    </div>
  )
}

export default page