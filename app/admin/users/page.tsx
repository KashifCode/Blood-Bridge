import React from 'react'
import UserRecords from '@/app/admin/components/UserRecords'

const page = () => {
  return (
    <div className='w-full pl-6 pr-[4%] py-5 flex flex-col gap-y-4'>
      <UserRecords />
    </div>
  )
}

export default page