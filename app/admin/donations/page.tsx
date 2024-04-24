import React from 'react'
import AdminDonationsChart from '@/app/admin/components/AdminDonationsChart'
import DonationsRecord from '@/app/admin/components/DonationsRecord'

const page = () => {
  return (
    <div className='w-full pl-6 pr-[4%] py-5 flex flex-col gap-y-8'>
      <AdminDonationsChart />
      <DonationsRecord />
    </div>
  )
}

export default page