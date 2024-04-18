import React from 'react'
import AdminDashboardChart from '@/app/admin/components/AdminDashboardChart'
import AdminDashboardTables from '@/app/admin/components/AdminDashboardTables'

const page = () => {
  return (
    <div className='w-full pl-6 pr-[4%] py-5 flex flex-col gap-y-4'>
      <AdminDashboardChart />
      <AdminDashboardTables />
    </div>
  )
}

export default page