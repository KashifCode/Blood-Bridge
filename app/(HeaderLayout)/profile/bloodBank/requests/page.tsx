import React from 'react'
import RequestStatistics from '@/app/(HeaderLayout)/profile/components/RequestStatistics'

const page = () => {
  return (
    <div className={`w-full bg-stone-50 pl-[2%] pr-[4%] pt-6 relative h-full`}>
      <p className='font-DMSansSemiBold mb-4 text-xl text-slate-900 capitalize'>Blood Requests Statistics</p>
      <RequestStatistics />
    </div>
  )
}

export default page