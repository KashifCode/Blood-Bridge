"use client"

import React, { useState, useEffect } from 'react'
import { getReviewsHome } from '@/app/axios-api/Endpoint'
import { axiosInstance as axios } from '@/app/axios-api/axios'
import toast from 'react-hot-toast'

const UserReviews = () => {
    const [userReviews, setUserReviews] = useState<any[]>([])

    useEffect(() => {
        const url = getReviewsHome();
        axios.get(url).then((res) => {
            setUserReviews(res.data.feedbacks);
        }).catch((err) => {
            console.log(err);
            toast.error(err?.response?.data?.message || "An error occurred");
        })
    }, [])

    console.log(userReviews)

    return (
        <div className='w-full pl-[6%] pr-[3%] my-6'>
            UserReviews
        </div>
    )
}

export default UserReviews