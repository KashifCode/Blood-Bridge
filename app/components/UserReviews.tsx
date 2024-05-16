"use client"

import React, { useState, useEffect } from 'react'
import { getReviewsHome } from '@/app/axios-api/Endpoint'
import { axiosInstance as axios } from '@/app/axios-api/axios'
import toast from 'react-hot-toast'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
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

    return (
        <div className='w-full pl-[3%] pr-[2%] md:!pl-[6%] md:!pr-[3%] my-6'>
            <h1 className='text-[#3A3737] text-xl md:!text-4xl font-PlayfairDisplayBold text-center capitalize pt-5 pb-12'>What People Are Saying About Us</h1>
            <Swiper
                initialSlide={0}
                pagination={{
                    clickable: true,
                }}
                loop={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                modules={[Pagination, Autoplay]}
                className="mySwiper w-full min-h-[40vh] md:!min-h-[30vh]"
            >
                {userReviews?.map((review: any, index: number) => (
                    <SwiperSlide key={index} >
                        <div className='w-full flex items-start justify-center gap-x-3 md:!gap-x-5'>
                            <Image src={review?.avatar} alt='User Avatar' width={100} height={100} className='rounded-full !w-[80px] !h-[80px] md:!w-[100px] md:!h-[100px] object-cover' />
                            <p className='text-4xl md:!text-5xl text-[#828282] font-PlayfairDisplayBold '>“</p>
                            <div className='flex flex-col items-start gap-y-3 max-w-[55%]'>
                                <p className='text-[#828282] text-base md:!text-lg font-LatoMedium max-w-full'>{review?.feedback}</p>
                                <p className='text-[#AA2D30] text-sm md:!text-base font-LatoMedium uppercase tracking-[3px] md:!tracking-[5px]'>{review?.name}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default UserReviews