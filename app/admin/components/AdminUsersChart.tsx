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
import { admGetAllUsers } from "@/app/axios-api/Endpoint";
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

const AdminUsersChart = () => {
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        const usersUrl = admGetAllUsers()

        axios.get(usersUrl).then((res) => {
            setUsers(res.data.users);
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

    const oneYearUsers = users?.filter((user: any) => {
        const date = new Date(user.createdAt.split('T')[0]);
        return (date.getFullYear() === new Date().getFullYear() && date.getMonth() <= currentMonth) || (date.getFullYear() === new Date().getFullYear() - 1 && monthsBeforeJan.includes(shortMonth(date)));
    });

    //add no of requests per month
    const userValues = new Array(12).fill(0);

    oneYearUsers?.forEach((user: any) => {
        const date = new Date(user.createdAt.split('T')[0]);
        userValues[date.getMonth()] += 1;
    });

    //sort the values as the same order of labels
    const sortedUserValues = userValues.slice(currentMonth + 1).concat(userValues.slice(0, currentMonth + 1));

    const data = {
        labels: sortedLabels,
        datasets: [
            {
                label: 'Users',
                data: sortedLabels.map((_, ind) => sortedUserValues[ind]),
                borderColor: '#73A02C',
                backgroundColor: '#33A02C',
            }
        ],
    };

    return (
        <div className='flex flex-col gap-y-5 justify-between w-full relative'>
            <div className='w-3/4 mx-auto'>
                <Line options={options} data={data} />
            </div>
        </div>
    );
};

export default AdminUsersChart