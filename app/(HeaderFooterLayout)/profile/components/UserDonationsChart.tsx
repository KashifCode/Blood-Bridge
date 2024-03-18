"use client"

import React from 'react'
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

const UserDonationsChart = ({ donations }: { donations: any }) => {
  //last 5 years
  const currentYear = new Date().getFullYear();
  const labels = [`${currentYear - 4}`, `${currentYear - 3}`, `${currentYear - 2}`, `${currentYear - 1}`, `${currentYear}`];

  //add no of donatons per year
  const values = new Array(5).fill(0);
  donations.forEach((donation: any) => {
    const date = new Date(donation.donationDate.split('T')[0]);
    values[currentYear - date.getFullYear()] += 1;
  });

  //reverse the values
  const reversedValues = values.reverse();

  // const newLabels = labels.filter((_, ind) => values[ind] !== 0);

  // const newValues = values.filter((val) => val !== 0);

  const data = {
    labels: labels,
    datasets: [
      {
        label: '',
        data: labels.map((_, ind) => reversedValues[ind]),
        borderColor: '#BF372A',
        backgroundColor: '#DF372A',
      }
    ],
  };

  return (
    <div className='flex flex-col justify-between w-[90%] mx-auto relative'>
      <h3 className='text-black font-RobotoBold text-xl mb-4 capitalize'>Blood Donations</h3>
      <Line options={options} data={data} />
    </div>
  )
}

export default UserDonationsChart