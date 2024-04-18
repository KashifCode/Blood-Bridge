"use client"

import React, { useEffect, useState } from 'react'
import { axiosInstance as axios } from '@/app/axios-api/axios'
import { admGetAllDonations, admGetAllRequests, admUserActions, userUpdateDetailsUrl } from '@/app/axios-api/Endpoint'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

const ViewUserDetails = ({ id }: { id: string }) => {
    const [user, setUser] = useState<any>(null)
    const [donationCount, setDonationCount] = useState<number>(0)
    const [requestCount, setRequestCount] = useState<number>(0)
    // const [isActive, setIsActive] = useState<boolean>(false)

    useEffect(() => {
        const url = admUserActions() + id;
        const donationsUrl = admGetAllDonations();
        const requestsUrl = admGetAllRequests();

        axios.get(url).then((res) => {
            setUser(res.data.user);
            // setIsActive(res.data.user.isActive);
        }).catch((err) => {
            console.log(err);
            toast.error(err?.response?.data?.message || 'An error occurred');
        })

        axios.get(donationsUrl).then((res) => {
            setDonationCount(res.data.bloodDonations.filter((donation: any) => donation.user === id).length);
        }).catch((err) => {
            console.log(err);
            toast.error(err?.response?.data?.message || 'An error occurred');
        })

        axios.get(requestsUrl).then((res) => {
            setRequestCount(res.data.bloodRequests.filter((request: any) => request.user === id).length);
        }).catch((err) => {
            console.log(err);
            toast.error(err?.response?.data?.message || 'An error occurred');
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    return (
        <div className='flex flex-col gap-y-6'>
            <h3 className='text-xl font-LatoBold text-black flex items-center gap-x-2'><Link href={"/admin/users"}><ChevronLeft size={22} /></Link><span>User Details</span></h3>
            <div className='flex flex-col gap-y-4 border border-solid border-[#989898] rounded-xl px-7 py-5'>
                <div>
                    <p className='text-[15px] text-black'>Name</p>
                    <h4 className='text-lg text-black font-medium'>{user?.firstName + " " + user?.lastName}</h4>
                </div>
                <div>
                    <p className='text-[15px] text-black'>Blood Group</p>
                    <h4 className='text-lg text-black font-medium'>{user?.bloodGroup}</h4>
                </div>
                <div>
                    <p className='text-[15px] text-black'>City</p>
                    <h4 className='text-lg text-black font-medium'>{user?.city}</h4>
                </div>
                <div>
                    <p className='text-[15px] text-black'>CNIC</p>
                    <h4 className='text-lg text-black font-medium'>{user?.cnic}</h4>
                </div>
                <div>
                    <p className='text-[15px] text-black'>Contact</p>
                    <h4 className='text-lg text-black font-medium'>{user?.contact}</h4>
                </div>
                <div>
                    <p className='text-[15px] text-black'>Donations</p>
                    <h4 className='text-lg text-black font-medium'>{donationCount}</h4>
                </div>
                <div>
                    <p className='text-[15px] text-black'>Requests</p>
                    <h4 className='text-lg text-black font-medium'>{requestCount}</h4>
                </div>
                <div>
                    <p className='text-[#686870]'>Status</p>
                    <h4 className='text-lg text-black font-medium'>{user?.isActive ? "Active" : "Inactive"}</h4>
                    {/* <div className='flex items-center gap-x-6'>
                        <div className='flex items-center gap-x-2 cursor-pointer'>
                            <input type='radio' id='userActive' checked={isActive} onClick={!isActive ? () => setIsActive(!isActive) : () => {}}/>
                            <label htmlFor="userActive">Active</label>
                        </div>
                        <div className='flex items-center gap-x-2 cursor-pointer'>
                            <input type='radio' id='userInActive' checked={!isActive} onClick={isActive ? () => setIsActive(!isActive) : () => {}}/>
                            <label htmlFor="userInActive">Inactive</label>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default ViewUserDetails