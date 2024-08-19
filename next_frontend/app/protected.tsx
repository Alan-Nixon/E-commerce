"use client";
import { useEffect, ReactNode } from 'react';
import { useSession, signIn } from 'next-auth/react';
import LoadingPage from './loading';
import { useRouter } from 'next/navigation';

export function ProtectedRoute({ children, route }: { children: ReactNode, route: string }) {

    const { data: session, status } = useSession();
    const router = useRouter()
    console.log(session);

    useEffect(() => {

        if (status === 'unauthenticated') { signIn() }
        if (status === 'authenticated') { router.push(route) }

    }, [session, status]);

    if (status === 'loading') { return <LoadingPage /> }

    return <>{children}</>;

}


export const IsSession = ({ children }: { children: ReactNode }) => {
    const { status } = useSession();
    const router = useRouter()

    useEffect(() => {
        if (status === 'authenticated') { router.push("/") }
    }, [status]);

    if (status === 'loading') { return <LoadingPage /> }

    return <>{children}</>;
}

export const AdminProtected = ({ children }: { children: ReactNode }) => {
    const { data: session, status } = useSession();
    const router = useRouter()
    console.log(session);

    return children
}