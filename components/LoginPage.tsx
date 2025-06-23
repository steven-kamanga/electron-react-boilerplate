import React from 'react'
import { Button } from './ui/button'
import { NavLink, Link } from 'react-router-dom'
import { LoginForm } from './LoginForm'

const LoginPage = () => {
  return (
    <section className='flex w-full flex-col items-center justify-center'>
      <div className='flex flex-col items-center justify-center mb-8'>
        <p className='font-semibold'>Welcome back!</p>
        <i className='text-xs'>Please login to your account.</i>
      </div>
      <LoginForm />
    <p className='mt-4 text-sm'>
      Dont have an account? {" "}
    <span>
      <NavLink className="underline" to="/sign-up" >
        Sign Up!
      </NavLink>
    </span>
    </p>
    </section>
  )
}

export default LoginPage
