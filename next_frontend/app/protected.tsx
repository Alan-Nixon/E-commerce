"use client";
import { useEffect, ReactNode } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { LoadingPage } from './helpers/card';

export function ProtectedRoute({ children }: { children: ReactNode }) {
    const { data: session, status } = useSession();

    useEffect(() => {

        if (status === 'unauthenticated') { signIn() }

    }, [session, status]);

    if (status === 'loading') {
        return <LoadingPage />;
    }

    return <>{children}</>;
}
