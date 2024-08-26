"use client";
import { useEffect, ReactNode, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import LoadingPage from './loading';
import { useRouter } from 'next/navigation';
import { getAdminToken, isAdminAuthenticated } from './Functions/admin_related';

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

export const AdminProtected = ({ children, route }: { route: string, children: ReactNode }) => {
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    const token = getAdminToken()
    useEffect(() => {
        if (token) {
            isAdminAuthenticated(token).then(({ status }: responseType) => {
                if (!status) {
                    router.push("/admin/login")
                } else {
                    setLoading(false)
                }
            });
        } else {
            router.push("/admin/login")
        }
    }, [])

    return loading ? <LoadingPage /> : children
}