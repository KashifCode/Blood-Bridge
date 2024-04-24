import React from 'react'
import BloodBanksRecord from '@/app/admin/components/BloodBanksRecord'

const page = () => {
  return (
    <div className='w-full pl-6 pr-[4%] py-5 flex flex-col gap-y-4'>
      <BloodBanksRecord isFromBlocked={true}/>
    </div>
  )
}

export default page