"use client"

import React, { useState } from 'react'
import DonationStatistics from './DonationStatisticsBSP'

const BloodDonationSubPage = () => {
    const bloodTypes = ["All", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
    const monthOptions = ["All", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const [selectedMonth, setSelectedMonth] = useState<string>(monthOptions[0].toLowerCase())
    const [selectedType, setSelectedType] = useState<string>(bloodTypes[0].toLowerCase())

    
    return (
        <div className='w-full'>
            <div className='flex items-center justify-between'>
                <p className='font-LatoMedium text-xl text-slate-900'>Blood Group:<span className='text-xl text-red-700 pl-2'>{selectedType}</span></p>
                <div className='flex items-center gap-x-3.5 flex-row-reverse'>
                    <select className='outline-0 border-none focus:border-none focus:outline-0 bg-red-700 text-white p-1 rounded-lg cursor-pointer' defaultValue={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                        {monthOptions.map((option: string, index: number) => (
                            <option key={index} value={option.slice(0, 3).toLowerCase()}>{option}</option>
                        ))}
                    </select>
                    <select className='outline-0 border-none focus:border-none focus:outline-0 bg-red-700 text-white p-1 rounded-lg cursor-pointer' defaultValue={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                        {bloodTypes.map((option: string, index: number) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
            </div>
            <DonationStatistics selectedMonth={selectedMonth} selectedType={selectedType} />
        </div>
    )
}

export default BloodDonationSubPage