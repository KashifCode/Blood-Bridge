"use client"

import React, { useState, useEffect } from 'react'
import { getReviewsBloodBank } from '@/app/axios-api/Endpoint'
import { axiosInstance as axios } from '@/app/axios-api/axios'
import toast from 'react-hot-toast'
import shadow from '@/app/components/shadow.module.css'
import cx from 'classnames'
import { useBBSelector } from '@/redux/store'
import Image from 'next/image'

const ReviewsStatistics = () => {
    const [reviews, setReviews] = useState<any>()
    const user = useBBSelector((state) => state.authReducer.value.user)

    useEffect(() => {
        const url = getReviewsBloodBank();

        axios.get(url, {
            withCredentials: true
        }).then((res) => {
            setReviews(res.data.reviews)
        }).catch((err) => {
            console.log(err)
            toast.error(err?.response?.data?.message || "An error occurred")
        })

    }, [])

    return (
        <>
            <p className="font-DMSansSemiBold mb-4 text-xl text-slate-900 capitalize">
                {user?.name} Reviews
            </p>
            <div className='flex flex-col gap-y-6 mx-[5%]'>
                {reviews?.map((review: any, index: number) => (
                    <div key={index} className={cx('w-full flex flex-col items-center rounded-xl p-4', [shadow.lightShadow])}>
                        <div className='w-full flex items-center justify-between mb-3'>
                            <div className='flex items-center gap-x-4'>
                                <Image src={review?.user?.avatar} alt='User Avatar' width={50} height={50} className='rounded-full !w-[50px] !h-[50px] object-cover' />
                                <p className='text-black text-lg font-LatoMedium'>{review?.user?.firstName} {review?.user?.lastName}</p>
                            </div>
                        </div>
                        <div className='w-full flex flex-col gap-y-2'>
                            <p className='text-black text-lg font-LatoMedium'><span className='font-DMSansSemiBold text-darkRed'>Type:</span> {review?.reqType === "request" ? "Blood Request" : "Blood Donation"}</p>
                            <p className='text-black text-lg font-LatoMedium'><span className='font-DMSansSemiBold text-darkRed'>Reviewed On:</span> {review?.createdAt?.split('T')[0]}</p>
                            <p className='text-black text-lg font-LatoMedium'><span className='font-DMSansSemiBold text-darkRed'>Review:</span> {review?.comment}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ReviewsStatistics