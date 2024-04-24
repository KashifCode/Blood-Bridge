"use client";

import React, { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { axiosInstance as axios } from "@/app/axios-api/axios";
import { admGetAllEvents } from "@/app/axios-api/Endpoint";
import toast from "react-hot-toast";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
);

const options = {
    responsive: true,
    tension: 0.4,
    plugins: {
        legend: {
            position: "top" as const,
        },
    },
};

const AdminEventsChart = () => {
    const [events, setEvents] = useState<any[]>([]);

    useEffect(() => {
        const eventsUrl = admGetAllEvents()

        axios.get(eventsUrl).then((res) => {
            setEvents(res.data.events);
        }).catch((err) => {
            console.log(err);
            toast.error(err?.response?.data?.message || 'An error occurred');
        });

    }, []);

    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    //sort the labels as current month to be the last
    const currentMonth = new Date().getMonth();
    const sortedLabels = labels.slice(currentMonth + 1).concat(labels.slice(0, currentMonth + 1));

    //get months before Jan from sorted labels
    const JanMonth = sortedLabels.indexOf('Jan');
    const monthsBeforeJan = sortedLabels.slice(0, JanMonth);

    //get Short month name from date
    const shortMonth = (date: Date) => {
        return date.toLocaleString('default', { month: 'short' });
    }

    const oneYearEvents = events?.filter((event: any) => {
        const date = new Date(event.eventDate.split('T')[0]);
        return (date.getFullYear() === new Date().getFullYear() && date.getMonth() <= currentMonth) || (date.getFullYear() === new Date().getFullYear() - 1 && monthsBeforeJan.includes(shortMonth(date)));
    });

    //add no of events per month
    const eventValues = new Array(12).fill(0);

    oneYearEvents?.forEach((event: any) => {
        const date = new Date(event.eventDate.split('T')[0]);
        eventValues[date.getMonth()] += 1;
    });

    //sort the values as the same order of labels
    const sortedEventValues = eventValues.slice(currentMonth + 1).concat(eventValues.slice(0, currentMonth + 1));

    const data = {
        labels: sortedLabels,
        datasets: [
            {
                label: 'Events',
                data: sortedLabels.map((_, ind) => sortedEventValues[ind]),
                borderColor: '#AACEE3',
                backgroundColor: '#A6CEE3',
            }
        ],
    };

    return (
        <div className='flex flex-col gap-y-5 justify-between w-full relative'>
            <h3 className='font-LatoMedium text-black text-xl capitalize'>Events</h3>
            <div className='w-3/4 mx-auto'>
                <Line options={options} data={data} />
            </div>
        </div>
    );
};

export default AdminEventsChart