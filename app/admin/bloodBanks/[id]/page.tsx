import React from 'react'
import ViewBloodBankDetails from '@/app/admin/components/ViewBloodBankDetails';

const page = ({
    params,
}: {
    params: { id: string; };
}) => {
    const { id } = params;
    return (
        <div className='w-full pl-6 pr-[4%] py-5 flex flex-col gap-y-4'>
            <ViewBloodBankDetails id={id}/>
        </div>
    )
}

export default page