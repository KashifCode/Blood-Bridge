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
import { admGetAllBloodBanks, admGetAllDonations, admGetAllRequests, admGetAllUsers } from "@/app/axios-api/Endpoint";
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

const AdminDashboardChart = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [bloodBanks, setBloodBanks] = useState<any[]>([]);
    const [donations, setDonations] = useState<any[]>([]);
    const [requests, setRequests] = useState<any[]>([]);

    useEffect(() => {
        const requestsUrl = admGetAllRequests()
        const donationsUrl = admGetAllDonations()
        const bloodBanksUrl = admGetAllBloodBanks()
        const usersUrl = admGetAllUsers()

        axios.get(requestsUrl).then((res) => {
            setRequests(res.data.bloodRequests);
        }).catch((err) => {
            console.log(err);
            toast.error(err?.response?.data?.message || 'An error occurred');
        });

        axios.get(donationsUrl).then((res) => {
            setDonations(res.data.bloodDonations);
        }).catch((err) => {
            console.log(err);
            toast.error(err?.response?.data?.message || 'An error occurred');
        });

        axios.get(bloodBanksUrl).then((res) => {
            setBloodBanks(res.data.bloodBanks);
        }).catch((err) => {
            console.log(err);
            toast.error(err?.response?.data?.message || 'An error occurred');
        });

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

    const oneYearRequests = requests?.filter((request: any) => {
        const date = new Date(request.bloodNeededOn.split('T')[0]);
        return (date.getFullYear() === new Date().getFullYear() && date.getMonth() <= currentMonth) || (date.getFullYear() === new Date().getFullYear() - 1 && monthsBeforeJan.includes(shortMonth(date)));
    });
    const oneYearDonations = donations?.filter((donation: any) => {
        const date = new Date(donation.donationDate.split('T')[0]);
        return (date.getFullYear() === new Date().getFullYear() && date.getMonth() <= currentMonth) || (date.getFullYear() === new Date().getFullYear() - 1 && monthsBeforeJan.includes(shortMonth(date)));
    });
    const oneYearBloodBanks = bloodBanks?.filter((bloodBank: any) => {
        const date = new Date(bloodBank.createdAt.split('T')[0]);
        return (date.getFullYear() === new Date().getFullYear() && date.getMonth() <= currentMonth) || (date.getFullYear() === new Date().getFullYear() - 1 && monthsBeforeJan.includes(shortMonth(date)));
    });
    const oneYearUsers = users?.filter((user: any) => {
        const date = new Date(user.createdAt.split('T')[0]);
        return (date.getFullYear() === new Date().getFullYear() && date.getMonth() <= currentMonth) || (date.getFullYear() === new Date().getFullYear() - 1 && monthsBeforeJan.includes(shortMonth(date)));
    });

    //add no of requests per month
    const requestValues = new Array(12).fill(0);
    const donationValues = new Array(12).fill(0);
    const bloodBanksValues = new Array(12).fill(0);
    const userValues = new Array(12).fill(0);

    oneYearRequests?.forEach((request: any) => {
        const date = new Date(request.bloodNeededOn.split('T')[0]);
        requestValues[date.getMonth()] += 1;
    });
    oneYearDonations?.forEach((donation: any) => {
        const date = new Date(donation.donationDate.split('T')[0]);
        donationValues[date.getMonth()] += 1;
    });
    oneYearBloodBanks?.forEach((bloodBank: any) => {
        const date = new Date(bloodBank.createdAt.split('T')[0]);
        bloodBanksValues[date.getMonth()] += 1;
    });
    oneYearUsers?.forEach((user: any) => {
        const date = new Date(user.createdAt.split('T')[0]);
        userValues[date.getMonth()] += 1;
    });

    //sort the values as the same order of labels
    const sortedRequestValues = requestValues.slice(currentMonth + 1).concat(requestValues.slice(0, currentMonth + 1));
    const sortedDonationValues = donationValues.slice(currentMonth + 1).concat(donationValues.slice(0, currentMonth + 1));
    const sortedBloodBanksValues = bloodBanksValues.slice(currentMonth + 1).concat(bloodBanksValues.slice(0, currentMonth + 1));
    const sortedUserValues = userValues.slice(currentMonth + 1).concat(userValues.slice(0, currentMonth + 1));

    const data = {
        labels: sortedLabels,
        datasets: [
            {
                label: 'Users',
                data: sortedLabels.map((_, ind) => sortedUserValues[ind]),
                borderColor: '#73A02C',
                backgroundColor: '#33A02C',
            },
            {
                label: 'Blood Banks',
                data: sortedLabels.map((_, ind) => sortedBloodBanksValues[ind]),
                borderColor: '#AACEE3',
                backgroundColor: '#A6CEE3',
            },
            {
                label: 'Donations',
                data: sortedLabels.map((_, ind) => sortedDonationValues[ind]),
                borderColor: '#5F78B4',
                backgroundColor: '#1F78B4',
            },
            {
                label: 'Requests',
                data: sortedLabels.map((_, ind) => sortedRequestValues[ind]),
                borderColor: '#B7DF8A',
                backgroundColor: '#B2DF8A',
            }
        ],
    };

    return (
        <div className='flex flex-col gap-y-5 justify-between w-full relative'>
            <h3 className='font-LatoMedium text-black text-xl capitalize'>Statistics</h3>
            <div className='w-3/4 mx-auto'>
                <Line options={options} data={data} />
            </div>
        </div>
    );
};

export default AdminDashboardChart