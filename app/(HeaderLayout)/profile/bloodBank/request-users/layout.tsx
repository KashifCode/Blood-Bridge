import TanstackProvider from '@/app/providers/TanstackProvider'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <TanstackProvider>
            {children}
        </TanstackProvider>
    )
}

export default layout