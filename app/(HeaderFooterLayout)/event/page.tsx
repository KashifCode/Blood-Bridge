import React from 'react'
import HomeIntro from '@/app/components/HomeIntro'
import UserEvents from './components/UserEvents'

const page = () => {
  return (
    <>
      <HomeIntro isSecondImage={true} />
      <UserEvents />
    </>
  )
}

export default page