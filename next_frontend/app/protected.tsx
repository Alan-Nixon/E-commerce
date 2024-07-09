"use client";
import { useEffect, ReactNode } from 'react';
import { useSession, signIn } from 'next-auth/react';

export function ProtectedRoute({ children }: { children: ReactNode }) {
    const { data: session, status } = useSession();
    
    useEffect(() => {
        console.log("ProtectedRoute useEffect called", session, status);

        if (status === 'loading') {
            console.log("Loading...");
        } else {
            console.log("ProtectedRoute useEffect called", session, status);
        }

        if (status === 'unauthenticated') {
            signIn(); 
        }
    }, [session, status]);

    if (status === 'loading') {
        return <div>Loading...</div>; 
    }

    return <>{children}</>;
}
