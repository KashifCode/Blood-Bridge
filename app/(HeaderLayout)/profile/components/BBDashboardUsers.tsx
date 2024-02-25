"use client"
import React, { useEffect, useState } from 'react'
import { axiosInstance as axios } from '@/app/axios-api/axios'
import { BBgetAllBloodDonations, BBgetAllBloodRequestes } from '@/app/axios-api/Endpoint'
import toast from 'react-hot-toast'
import RequestStatistics from './RequestStatistics'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'

const BBDashboardUsers = () => {
    const [usersData, setUsersData] = useState<any>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [donationsRes, requestsRes] = await Promise.all([
                    axios.get(BBgetAllBloodDonations(), { withCredentials: true }),
                    axios.get(BBgetAllBloodRequestes(), { withCredentials: true })
                ]);
                const bloodDonations = donationsRes.data.bloodDonations;
                const bloodRequests = requestsRes.data.bloodRequests;

                const uniqueUsersMap = new Map();

                [...bloodDonations, ...bloodRequests].forEach(item => {
                    if (item.user !== null) {
                        const userId = item.user._id;
                        if (!uniqueUsersMap.has(userId)) {
                            uniqueUsersMap.set(userId, {
                                user: item.user,
                                donations: 0,
                                requests: 0
                            });
                        }
                        const userData = uniqueUsersMap.get(userId);
                        if (!item.bloodNeededOn) userData.donations++;
                        else userData.requests++;
                    }
                });

                const users = Array.from(uniqueUsersMap.values());

                //sort these users based on the number of requests and donations
                users.sort((a, b) => (a.requests + a.donations) > (b.requests + b.donations) ? -1 : 1);

                setUsersData(users);
            } catch (error: any) {
                toast.error(error.response ? error.response.data.message : 'An error occurred');
                console.error(error);
            }
        };

        if (!usersData) {
            fetchData();
        }
    }, [usersData]);

    return (
        <div className='flex justify-between w-full mt-7'>
            <div className='w-[69%]'>
                <RequestStatistics isFromDashboard={true} />
            </div>
            <div className={`w-[26%] bg-white border border-slate-300 rounded-[10px] px-4 py-1`}>
                <p className='text-slate-500 font-DMSansMedium capitalize text-lg mb-2'>Users</p>
                {usersData?.slice(0, 6).map((userData: any, index: number) => (
                    <div key={index} className='flex items-center justify-between border-b border-slate-300 py-2'>
                        <div className='flex items-center gap-x-5'>
                            <div className='w-[68px] h-[68px] px-0.5 py-0.5 rounded-full bg-gradient-to-b from-[#12C4B2] to-[#68299F]'>
                                <Image className='!w-16 !h-16 object-cover rounded-full' src={userData?.user?.avatar} width={64} height={64} alt='profile' />
                            </div>
                            <div className='flex flex-col gap-y-0.5'>
                                <p className='text-slate-500 font-DMSansMedium text-lg'>{userData?.user?.firstName + " " + userData?.user?.lastName}</p>
                                <p className='text-slate-500 font-DMSansMedium text-sm'>Requests: {userData?.requests}, Donations: {userData?.donations}</p>
                            </div>
                        </div>
                        <Link href={`mailto::${userData?.user?.email}`} className='bg-[#E3E3E3] p-2 rounded-md cursor-pointer'>
                            <ExternalLink size={23}/>
                        </Link>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default BBDashboardUsers