import React from 'react'
import BloodDonationSubPage from '@/app/(HeaderLayout)/profile/bloodBank/blood/components/BloodDonationSubPage'

const page = () => {
  return (
    <div className={`w-full bg-stone-50 pl-[2%] pr-[4%] pt-6 relative h-full`}>
      <p className='font-DMSansSemiBold mb-4 text-xl text-slate-900 capitalize'>Blood Donations</p>
      <BloodDonationSubPage />
    </div>
  )
}

export default page