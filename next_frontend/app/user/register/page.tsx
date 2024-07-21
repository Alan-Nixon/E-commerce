"use client"
import { validateEmail, validateFullName, validateName, validatePassword, validatePhone } from '@/app/Functions/validation';
import Link from 'next/link';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { IsSession } from '@/app/protected';
import { postRegister } from '@/app/Functions/user_related';

function RegisterPage() {
  const [error, setError] = useState("");
  const [registerCredentials, setRegisterCredentials] = useState<userInterface>({
    Email: "", Password: "", Name: "",
    FullName: "", Phone: "", IsAdmin: false,
    IsBlocked: false, ProfileImage: "https://e1.pxfuel.com/desktop-wallpaper/1012/835/desktop-wallpaper-no-profile-pic-no-profile.jpg"
  })

  const { push } = useRouter()

  const onchangeFunc = (e: any) => {

    setRegisterCredentials((rest) => ({
      ...rest,
      [e.target.name]: e.target.value
    }));
    setError("")
  }

  const submitForm = () => {
    if (validation()) {
      postRegister({
        ...registerCredentials,
        Phone: Number(registerCredentials.Phone)

      }).then(({ status, message,data }) => { 
        
        status ? signIn('credentials', {

          redirect: false,
          Email: data.Email,
          Password: data.Password,

        }).then(result => {
          result?.error ? setError('Invalid Email or Password. Please try again.') : push('/');
        }) : setError(message);

      })
    }
  }

  function validation() {
    if (validateEmail(registerCredentials.Email)) {
      if (validatePassword(registerCredentials.Password)) {
        if (validatePhone(registerCredentials.Phone + "")) {
          if (validateName(registerCredentials.Name)) {
            if (validateFullName(registerCredentials.FullName)) {
              return true
            } else {
              setError("Invalid Full Name")
              return false
            }
          } else {
            setError("Invalid Name");
            return false
          }
        } else {
          setError("Invalid Phone Number");
          return false
        }
      } else {
        setError("Invalid Password");
        return false
      }
    } else {
      setError("Invalid Email");
      return false
    }
  }

  return (
    <IsSession>
      <div
        className="h-screen w-full bg-cover bg-center flex items-center justify-center overflow-y-hidden"
        style={{ backgroundImage: "url('/RegisterImage.jpg')" }}
      >
        <div className="bg-black w-[40rem] bg-opacity-50 p-5 rounded-lg flex flex-col items-center">
          <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-white">Register to your account</h2>
          <form className="w-full max-w-md bg-white bg-opacity-60 p-6 rounded-lg">
            {error && <p className="error mb-2">{error}</p>}

            <div className="flex gap-4">
              <div className="relative z-0 w-full mb-5 group">
                <input type="text" onChange={onchangeFunc} name="Name" id="Name" className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 appearance-none text-black border-black focus:outline-none focus:ring-0 focus:border-black peer" placeholder=" " required />
                <label htmlFor="text" className="peer-focus:font-medium absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input type="text" onChange={onchangeFunc} name="FullName" id="FullName" className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 appearance-none text-black border-black focus:outline-none focus:ring-0 focus:border-black peer" placeholder=" " required />
                <label htmlFor="FullName" className="peer-focus:font-medium absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Full Name</label>
              </div>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input type="number" onChange={onchangeFunc} name="Phone" id="Phone" className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 appearance-none text-black border-black focus:outline-none focus:ring-0 focus:border-black peer" placeholder=" " required />
              <label htmlFor="Email" className="peer-focus:font-medium absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone Number</label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input type="email" onChange={onchangeFunc} name="Email" id="Email" className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 appearance-none text-black border-black focus:outline-none focus:ring-0 focus:border-black peer" placeholder=" " required />
              <label htmlFor="Email" className="peer-focus:font-medium absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input type="password" onChange={onchangeFunc} name="Password" id="Password" className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-black border-black focus:border-black focus:outline-none focus:ring-0 peer" placeholder=" " required />
              <label htmlFor="Password" className="peer-focus:font-medium absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
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

            <Link href="/user/login" className='text-blue-900' >Already have an account ? login</Link>
          </form>
        </div>
      </div>
    </IsSession>
  )
}

export default RegisterPage
