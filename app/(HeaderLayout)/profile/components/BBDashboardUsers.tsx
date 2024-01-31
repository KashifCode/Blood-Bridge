"use client"
import React, { useEffect, useState } from 'react'
import { axiosInstance as axios } from '@/app/axios-api/axios'
import { BBgetAllBloodDonations, BBgetAllBloodRequestes } from '@/app/axios-api/Endpoint'
import toast from 'react-hot-toast'

const BBDashboardUsers = () => {
    const [bloodDonations, setbloodDonations] = useState<any[]>([])
    const [bloodRequests, setBloodRequests] = useState<any[]>([])
    const [users, setUsers] = useState<any>(null)
    useEffect(() => {
        if (!bloodDonations && !bloodRequests) {
            const url = BBgetAllBloodDonations();
            axios.get(url, {
                withCredentials: true
            }).then(res => {
                console.log(res.data)
                setbloodDonations(res.data.bloodDonations)
            }).catch(err => {
                toast.error(err.response.data.message)
                console.log(err)
            })
            const url2 = BBgetAllBloodRequestes();
            axios.get(url2, {
                withCredentials: true
            }).then(res => {
                setBloodRequests(res.data.bloodRequests)
            }).catch(err => {
                toast.error(err.response.data.message)
                console.log(err)
            })
        }
    }, [])

    useEffect(() => {
        if (bloodDonations && bloodRequests) {
            const uniqueUsers = [...bloodDonations, ...bloodRequests].filter((v, i, a) => a.findIndex(t => (t.user._id === v.user._id)) === i)

            const users = uniqueUsers.map((user) => {
                const donations = bloodDonations.filter((donation) => donation.user._id === user.user._id)
                const requests = bloodRequests.filter((request) => request.user._id === user.user._id)
                return {
                    user,
                    donations: donations.length,
                    requests: requests.length
                }
            })
            const donatedUsers = users.filter((user) => user.donations > 0)
            const requestedUsers = users.filter((user) => user.requests > 0)
            setUsers({ users, donatedUsers, requestedUsers })
        }
    }, [bloodDonations, bloodRequests])

    users && console.log(users)

    return (
        <div className='flex justify-between w-full mt-5'>
            <div className='w-[65%]'>

            </div>
            <div className={`w-[30%] bg-white border border-slate-300 rounded-[10px] min-h-[40vh] px-3 py-1`}>
                <p className='text-slate-500 font-DMSansMedium capitalize text-lg mb-2.5'>Users</p>

            </div>
        </div>
    )
}

export default BBDashboardUsers