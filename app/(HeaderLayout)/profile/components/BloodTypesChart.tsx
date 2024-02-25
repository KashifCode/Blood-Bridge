"use client"

import React, { useState, useEffect } from 'react'
import { axiosInstance as axios } from '@/app/axios-api/axios'
import { BBgetAllBloodTypes } from '@/app/axios-api/Endpoint'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    tension: 0.4,
    plugins: {
        legend: {
            position: 'top' as const,
        },
    },
};

const BloodTypesChart = ({ selectedMonth }: { selectedMonth: number }) => {
    const [bloodTypes, setBloodTypes] = useState<any[]>([])
    useEffect(() => {
        const url = BBgetAllBloodTypes();
        axios.get(url, {
            withCredentials: true,
        }).then((res) => {
            console.log(res.data.bloodTypes, "running")
            const bloodTypesStockHistory = res.data.bloodTypes?.map((bloodType: any) => {

                //remove previous month's data and current date's data
                let bloodTypeStockHistory = bloodType?.stockHistory?.map((stockHistory: any, ind: number) => {
                    const date = new Date(stockHistory.createdAt.split('T')[0])
                    const stock = stockHistory.stock
                    if ((date.getMonth() + 1) !== selectedMonth || date.getDate() === new Date().getDate()) {
                        return {
                            stock: 0,
                            date: 0,
                        }
                    }
                    return {
                        stock,
                        date: date.getDate(),
                    }
                })

                // add a new stock history for the 1st of current month along with all the data history,
                let lastStock = 0;
                const currentMonth = (new Date()).getMonth() + 1;
                const lastStockData = bloodType?.stockHistory?.filter((stockHistory: any) => {
                    const date = new Date(stockHistory.createdAt.split('T')[0])
                    return (date.getMonth() + 1) !== currentMonth
                })
                lastStock = lastStockData[lastStockData.length - 1]?.stock
                bloodTypeStockHistory = [...bloodTypeStockHistory, {
                    stock: lastStock,
                    date: 1
                }]

                //add history of current date
                bloodTypeStockHistory = [...bloodTypeStockHistory, {
                    stock: bloodType.stock,
                    date: new Date().getDate()
                }]
                bloodTypeStockHistory = bloodTypeStockHistory.filter((stockHistory: any) => (stockHistory.date !== 0 && stockHistory.stock !== 0))

                return {
                    ...bloodType,
                    stockHistory: bloodTypeStockHistory
                }
            })
            setBloodTypes(bloodTypesStockHistory)
        }).catch((err) => {
            console.log(err)
        })
    }, [selectedMonth])

    const days = new Date(new Date().getFullYear(), selectedMonth, 0).getDate();
    const daysArr = Array.from({ length: days }, (_, i) => i + 1);

    const newDaysArr = daysArr.filter((day) => {
        const bloodTypesWithStockHistory = bloodTypes.filter((bloodType: any) => {
            const stockHistory = bloodType.stockHistory.filter((stockHistory: any) => {
                return stockHistory.date === day
            })
            return stockHistory.length > 0
        })
        return bloodTypesWithStockHistory.length > 0
    })

    const data = {
        labels: newDaysArr,
        datasets: [
            {
                label: 'A+',
                data: newDaysArr.map((day, _) => bloodTypes.filter((bloodType: any) => bloodType.bloodGroup === 'A+')[0]?.stockHistory.filter((stockHistory: any) => stockHistory.date === day)[0]?.stock),
                borderColor: '#BF372A',
                backgroundColor: '#DF372A',
            },
            {
                label: 'A-',
                data: newDaysArr.map((day, _) => bloodTypes.filter((bloodType: any) => bloodType.bloodGroup === 'A-')[0]?.stockHistory.filter((stockHistory: any) => stockHistory.date === day)[0]?.stock),
                borderColor: '#1F78B4',
                backgroundColor: '#1F78D4',
            },
            {
                label: 'AB+',
                data: newDaysArr.map((day, _) => bloodTypes.filter((bloodType: any) => bloodType.bloodGroup === 'AB+')[0]?.stockHistory.filter((stockHistory: any) => stockHistory.date === day)[0]?.stock),
                borderColor: '#33A02C',
                backgroundColor: '#33C02C',
            },
            {
                label: 'AB-',
                data: newDaysArr.map((day, _) => bloodTypes.filter((bloodType: any) => bloodType.bloodGroup === 'AB-')[0]?.stockHistory.filter((stockHistory: any) => stockHistory.date === day)[0]?.stock),
                borderColor: '#FB9A99',
                backgroundColor: '#FF9A99',
            },
            {
                label: 'O+',
                data: newDaysArr.map((day, _) => bloodTypes.filter((bloodType: any) => bloodType.bloodGroup === 'O+')[0]?.stockHistory.filter((stockHistory: any) => stockHistory.date === day)[0]?.stock),
                borderColor: '#A6CEE3',
                backgroundColor: '#A6CEFF',
            },
            {
                label: 'O-',
                data: newDaysArr.map((day, _) => bloodTypes.filter((bloodType: any) => bloodType.bloodGroup === 'O-')[0]?.stockHistory.filter((stockHistory: any) => stockHistory.date === day)[0]?.stock),
                borderColor: '#B2DF8A',
                backgroundColor: '#B2EF8A',
            },
            {
                label: 'B+',
                data: newDaysArr.map((day, _) => bloodTypes.filter((bloodType: any) => bloodType.bloodGroup === 'B+')[0]?.stockHistory.filter((stockHistory: any) => stockHistory.date === day)[0]?.stock),
                borderColor: '#5E4D8A',
                backgroundColor: '#5E4DAA',
            },
            {
                label: 'B-',
                data: newDaysArr.map((day, _) => bloodTypes.filter((bloodType: any) => bloodType.bloodGroup === 'B-')[0]?.stockHistory.filter((stockHistory: any) => stockHistory.date === day)[0]?.stock),
                borderColor: '#003E5A',
                backgroundColor: '#003E7A',
            }
        ],
    }


    return (
        <div className='w-3/4 mx-auto relative'>
            <Line options={options} data={data} />
        </div>
    )
}

export default BloodTypesChart