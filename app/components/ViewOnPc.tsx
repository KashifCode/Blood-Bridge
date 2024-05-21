import React from 'react'
import redLogo from "@/assets/redLogo.png";
import Image from 'next/image';
import Link from 'next/link';

const ViewOnPc: React.FC<{ callFrom: string }> = ({ callFrom }) => {
    return (
        <div className='w-full min-h-screen max-h-screen overflow-hidden flex flex-col gap-y-7 items-center justify-center px-[5%] bg-gradient-to-b from-red-600 to-red-400'>
            <div className='bg-white w-[86px] h-[90px] rounded-3xl flex items-center justify-center'>
                <div className="w-16 h-16">
                    <Image
                        className="min-w-[2.5rem] lg:!min-w-[3rem] min-h-[2.5rem] lg:!min-h-[3rem] w-full h-full object-contain"
                        src={redLogo}
                        alt="Logo"
                    />
                </div>
            </div>
            <div className='flex flex-col gap-y-1'>
                <h3 className='text-xl leading-9 text-white font-DMSansSemiBold text-center'>{`${callFrom}`} Portal is only available on desktop.</h3>
                <h3 className='text-xl leading-9 text-white font-DMSansSemiBold text-center'>Sign in from your desktop to use {`${callFrom}`} Portal.</h3>
            </div>
            <Link href={"/"}>
                <div className='w-max h-[80px] bg-white rounded-2xl px-3 py-2 !pl-1 flex items-center gap-x-1'>
                    <Image className='!w-14 !h-14 object-contain' width={56} height={56} src={redLogo} alt='Logo' />
                    <div>
                        <p className='text-black font-DMSansRegular text-sm leading-5'>Back to Home Page</p>
                        <p className='text-black font-DMSansBold text-xl leading-6'>Blood Bridge</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default ViewOnPc