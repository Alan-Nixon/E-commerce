'use client'
import { ProtectedRoute } from '@/app/protected'
import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../navbar'
import Footer from '../footer'
import { useSession } from 'next-auth/react'
import LoadingPage from '@/app/loading'
import { User } from 'next-auth'
import { validateFullName, validateName, validatePassword } from '@/app/Functions/validation'
import { uploadImage } from '@/app/Functions/user_related'

function Profile() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [confirm, setConfirm] = useState("")
    const [error, setError] = useState("")
    const [user, setUser] = useState<User>({
        Email: "", FullName: "",
        id: "", IsAdmin: false,
        IsBlocked: false, Name: "", Password: "", Phone: 0
    })
    const { data } = useSession();
    const profileRef = useRef<any>()

    useEffect(() => {
        setOrders([]);
        if (data?.user) {
            setUser(data?.user as unknown as User)
            setConfirm(data.user.Password)
        }
        setLoading(false)
    }, [data]);

    const onChangeFunc = (key: string, value: string) => {
        setUser(rest => ({ ...rest, [key + ""]: value }))
    }

    const updateDetails = () => {
        if (validateName(user.Name)) {
            if (validateFullName(user.FullName)) {
                if (validatePassword(user.Password)) {
                    if (user.Password === confirm) {
                        alert("success")
                        console.log(user)
                    } else {
                        setError("Enter a valid Confirm Password")
                    }
                } else {
                    setError("Enter a valid Password")
                }
            } else {
                setError("Enter a valid Full Name")
            }
        } else {
            setError("Enter a valid Name")
        }
    }

    const changeProfile = (file: File) => {
        console.log(file)
        uploadImage(file)
    }

    if (loading) { return <LoadingPage /> }

    return (
        <ProtectedRoute route='/user/profile'>
            <Navbar />
            <div className="flex m-5 mt-20 overflow-hidden">
                <div className="md:flex h-auto sm:flex-wrap w-full">
                    <div className="bg-slate-500 sm:w-[100%] md:w-[30%]">
                        <div className="">
                            <h1 className="text-xl m-3 font-bold">Hi, {data?.user.FullName}</h1>
                            <div className="flex">
                                <div className="mx-auto">
                                    <img className='rounded-full w-56' src={data?.user.profileImage ?? "https://e1.pxfuel.com/desktop-wallpaper/1012/835/desktop-wallpaper-no-profile-pic-no-profile.jpg"} alt="" />
                                    <button onClick={() => profileRef.current.click()} type="button" className="text-white ml-10 mt-5 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Change Profile </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-400 flex sm:w-[100%] sm:mt-3 md:mt-0 p-3 h-auto md:w-[70%]">
                        <div className="mx-auto">

                            <h1 className='text-2xl text-center font-bold'>User Details</h1>

                            <form className="max-w-md m-5">
                                {error && <p className='error mb-3' >{error}</p>}
                                <div className="grid md:grid-cols-2 md:gap-6">
                                    <div className="relative z-0 w-full mb-5 group">
                                        <input onChange={(e) => onChangeFunc("Name", e.target.value)} defaultValue={user.Name} type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " required />
                                        <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                                    </div>
                                    <div className="relative z-0 w-full mb-5 group">
                                        <input onChange={(e) => onChangeFunc("FullName", e.target.value)} defaultValue={user.FullName} type="text" name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " required />
                                        <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Full name</label>
                                    </div>
                                </div>
                                <div className="relative z-0 w-full mb-5 group">
                                    <input type="email" value={user.Email} name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " required />
                                    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                                </div>
                                <div className="relative z-0 w-full mb-5 group">
                                    <input onChange={(e) => onChangeFunc("Password", e.target.value)} type="password" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " required />
                                    <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                                </div>
                                <div className="relative z-0 w-full mb-5 group">
                                    <input onChange={(e) => setConfirm(e.target.value)} type="password" name="repeat_password" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer" placeholder=" " required />
                                    <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
                                </div>
                                <input type="file" onChange={(e) => {
                                    if (e.target && e.target.files) {
                                        changeProfile(e.target.files[0])
                                    }
                                }} ref={profileRef} accept='image/*' className='hidden' />
                                <button type="button" onClick={updateDetails} className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
                            </form>



                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-3 m-6">
                <h1 className="text-2xl  font-bold">My Orders</h1>
                {orders.length === 0 ? <>
                    No order's yet
                </> : orders.map((item) => (<></>))}
            </div>
            <Footer />
        </ProtectedRoute>
    )
}

export default Profile
