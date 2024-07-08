"use client"
import { postLogin } from '@/app/Functions/user_related';
import { validateEmail, validatePassword } from '@/app/Functions/validation';
import Link from 'next/link';
import React, { useState } from 'react';

const LoginPage = () => {
  const [loginCredentials, setLoginCredentials] = useState({ Email: "", Password: "" })
  const [error, setError] = useState("")

  const submitForm = () => {
    if (validation()) {
      postLogin(loginCredentials).then((data) => {
        console.log(data);
        if (data.status) {

        } else {
          setError(data.message)
        }
      })
    }
  }


  function validation() {

    if (validateEmail(loginCredentials.Email)) {
      if (validatePassword(loginCredentials.Password)) {
        return true
      } else {
        setError("Invalid password, please enter a valid password")
        return false
      }
    } else {
      setError("Invalid email, please enter a valid email")
      return false
    }
  }

  return (
    <div
      className="h-screen w-full bg-cover bg-center flex items-center justify-center overflow-y-hidden"
      style={{ backgroundImage: "url('/bgLogin.webp')" }}
    >
      <div className="bg-black w-[40rem] bg-opacity-50 p-8 rounded-lg flex flex-col items-center">
        <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-white">Sign in to your account</h2>
        <form className="w-full max-w-md bg-white bg-opacity-60 p-8 rounded-lg">
          {error && <p className="error mb-2">{error}</p>}

          <div className="relative z-0 w-full mb-5 group">
            <input type="email" onChange={(e) => {
              setLoginCredentials({ Email: e.target.value + "", Password: loginCredentials.Password });
              setError("")
            }} name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 appearance-none text-black border-black focus:outline-none focus:ring-0 focus:border-black peer" placeholder=" " required />
            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input type="password" onChange={(e) => {
              setLoginCredentials({ Password: e.target.value + "", Email: loginCredentials.Email });
              setError("")
            }} name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-black border-black focus:border-black focus:outline-none focus:ring-0 peer" placeholder=" " required />
            <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
          </div>

          <button type="button" onClick={submitForm} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            Submit
          </button>

          <div className="flex"> <span className='text-center mx-auto'>OR</span></div>

          <button type="button" onClick={submitForm} className="text-white w-full bg-[#4285F4] hover:bg-[#4285F4]/95 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2">
            <div className="mx-auto flex">
              <svg className="w-4 h-4 mt-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                <path fillRule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clipRule="evenodd" />
              </svg>
              <span className='ml-2 mt-[0.5]'>Sign in with Google</span>
            </div>
          </button>

          <Link href="/user/register" className='text-blue-900' >Don't have an account ? register</Link>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
