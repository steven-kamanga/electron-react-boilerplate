import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h2 className='text-2xl font-bold'>
        Dispense Pro
      </h2>
      <main className='mt-6'>
        <Outlet/>
      </main>
    </div>
  )
}

export default AuthLayout
