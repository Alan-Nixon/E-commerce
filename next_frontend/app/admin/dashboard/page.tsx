"use client";
import { adminLogout } from '@/app/Functions/admin_related'
import { AdminProtected } from '@/app/protected'
import Link from 'next/link'
import React from 'react'

function page() {


    return (
        <AdminProtected route='/dashboard' >
            <div>
                Admin dashboard
                <Link href="/admin/login" onClick={()=>adminLogout()} >Logout</Link>
            </div>
        </AdminProtected>
    )
}

export default page
