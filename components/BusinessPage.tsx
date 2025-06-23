import React from 'react'
import { BusinessForm } from './ui/business-form'

const BusinessPage = () => {
  return (
    <div>
      <div className='flex flex-col items-center justify-center mb-8'>
        <p className='font-semibold'>You're Almost there!</p>
        <i className='text-xs'>Let's setup your Business Profile to get Started real quick!</i>
      </div>
      <BusinessForm />
    </div>
  )
}

export default BusinessPage
