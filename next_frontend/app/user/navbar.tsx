import Link from 'next/link';
import React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { logout } from '../Functions/user_related';
import { useSession } from 'next-auth/react';

function Navbar() {
    const { data: session, status } = useSession();

    console.log();
    

    const Data = {
        Logo: "/Logo.jpg",
        CompanyName: "AV Costumes"
    }

    const user: userInterface = {
        Name: "Alan",
        FullName: "Alan Nixon",
        ProfileImage: "/Logo.jpg",
        Email: "alannixon2520@gmail.com",
        Password: "string",
        Phone: 6282995964,
        IsAdmin: false,
        IsBlocked: true,
    }

    return (<>

        <nav className="fixed top-0 w-full z-50 border-gray-200 bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <p className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={Data.Logo} className="h-8 rounded-full" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">{Data.CompanyName}</span>
                </p>
                <div className="flex md:order-2">
                    <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" className="md:hidden text-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1">
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                        <span className="sr-only">Search</span>
                    </button>
                    <div className="relative hidden md:block">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span className="sr-only">Search icon</span>
                        </div>
                        <input type="text" id="search-navbar" className="block w-full p-2 ps-10 text-sm border rounded-lg  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Search..." />
                    </div>
                    <button data-collapse-toggle="navbar-search" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none focus:ring-2  text-gray-400 hover:bg-gray-700 focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div className="ml-3 flex gap-3">
                        <Link href="/user/profile">
                        <div className="mt-1 ml-8 flex font-bold py-2 px-3 text-white rounded md:bg-transparent md:p-0">
                            <img src={user.ProfileImage} className='rounded-full w-[32px]' alt="" />
                            <p className="mt-[3px] m-2 ">{user.FullName}</p>
                        </div>
                        </Link>
                        <p onClick={logout} className="block cursor-pointer py-4 px-3 font-medium text-white rounded mt-[5px] md:bg-transparent md:p-0">Logout</p>
                    </div>
                </div>


                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-search">
                    <div className="relative mt-3 md:hidden">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="text" id="search-navbar" className="block w-full p-2 ps-10 text-sm border rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Search..." />
                    </div>
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-gray-800 md:bg-gray-900 border-gray-700">

                        <li> <Link href="/" className={'block py-2 px-3 text-white rounded md:bg-transparent md:p-0'}>Home</Link> </li>
                        <li> <Link href="/#about" className={'block py-2 px-3 text-white rounded md:bg-transparent md:p-0'}>About</Link></li>
                        <li> <Link href="#Products" className={'block py-2 px-3 text-white rounded md:bg-transparent md:p-0'}>Products</Link></li>
                        <li><ShoppingCartIcon sx={{ color: 'white', marginLeft: "10px" }} /></li>

                    </ul>
                </div>

            </div>


        </nav>

    </>
    );
}

export default Navbar;


