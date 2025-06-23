import React from 'react'
import { NavLink } from 'react-router-dom'
import { UserRegisterForm } from './ui/user-register-form';


const SignUpPage = () => {
  return (
    <div>
      <div className='flex flex-col items-center justify-center mb-8'>
        <p className='font-semibold'>Let's Get you started!</p>
        <i className='text-xs'>Please fill out the form to quickly setup your business account!</i>
      </div>
      <UserRegisterForm />
      <p className='mt-4 text-sm'>
      Don't have an account? {" "}
      <span>
        <NavLink className="underline" to="/" >
          Sign In
        </NavLink>
      </span>
    </p>
    </div>
  )
}

export default SignUpPage
