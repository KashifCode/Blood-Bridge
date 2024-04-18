import React from 'react'
import ViewUserDetails from '@/app/admin/components/ViewUserDetails';

const page = ({
    params,
}: {
    params: { id: string; };
}) => {
    const { id } = params;
    return (
        <div className='w-full pl-6 pr-[4%] py-5 flex flex-col gap-y-4'>
            <ViewUserDetails id={id}/>
        </div>
    )
}

export default page