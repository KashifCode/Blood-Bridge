"use client"

import React, { useState, useEffect } from 'react'
import { getReviewsHome } from '@/app/axios-api/Endpoint'
import { axiosInstance as axios } from '@/app/axios-api/axios'
import toast from 'react-hot-toast'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image'

const UserReviews = () => {
    const [userReviews, setUserReviews] = useState<any[]>([])

    useEffect(() => {
        const url = getReviewsHome();
        axios.get(url).then((res) => {
            let reviews: any[] = []
            res.data.feedbacks?.map((review: any) => {
                review?.feedback?.map((feedback: any) => {
                    const newFeedback = {
                        avatar: review?.avatar,
                        name: review?.firstName + ' ' + review?.lastName,
                        feedback,
                    }
                    reviews.push(newFeedback)
                })
            })
            setUserReviews(reviews);
        }).catch((err) => {
            console.log(err);
            toast.error(err?.response?.data?.message || "An error occurred");
        })
    }, [])

    console.log(userReviews)

    return (
        <div className='w-full pl-[6%] pr-[3%] my-6'>
            <h1 className='text-[#3A3737] text-4xl font-PlayfairDisplayBold text-center capitalize pt-5 pb-12'>What People Are Saying About Us</h1>
            <Swiper
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper w-full min-h-[60vh]"
            >
                {userReviews?.map((review: any, index: number) => (
                    <SwiperSlide key={index}>
                        <div className='w-full flex items-start justify-center gap-x-5'>
                            <Image src={review?.avatar} alt='User Avatar' width={100} height={100} className='rounded-full !w-[100px] !h-[100px] object-cover' />
                            <p className='text-5xl text-[#828282] font-PlayfairDisplayBold '>“</p>
                            <div className='flex flex-col items-start gap-y-3 max-w-[55%]'>
                                <p className='text-[#828282] text-lg font-LatoMedium max-w-full'>{review?.feedback}</p>
                                <p className='text-[#AA2D30] text-base font-LatoMedium uppercase tracking-[5px]'>{review?.name}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default UserReviews