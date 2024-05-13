"use client"

import React, { useState, useEffect } from 'react'
import UserInfo from './UserInfo'
import cx from 'classnames'
import { usePathname } from 'next/navigation'

const MobileLayout = ({ children }: { children: React.ReactNode }) => {
    const path = usePathname()
    const [pageOpen, setPageOpen] = useState(false)

    useEffect(() => {
        if (path.includes('/profile/user')) {
            setPageOpen(true)
        }
        else {
            setPageOpen(false)
        }
    }, [path])

    return (
        <div className="flex w-full px-2 mt-10">
            <div className={cx('block', { '!hidden': pageOpen })}>
                <UserInfo />
            </div>
            <div className="w-full">{children}</div>
        </div>
    )
}

export default MobileLayout