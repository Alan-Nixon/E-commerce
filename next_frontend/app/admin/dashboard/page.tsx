import { AdminProtected } from '@/app/protected'
import React from 'react'

function page() {
    return (
        <AdminProtected>
            <div>
                Admin dashboard
            </div>
        </AdminProtected>
    )
}

export default page
