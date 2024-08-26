import NextAuth, { NextAuthOptions, Session, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';
import { postLogin } from '@/app/Functions/user_related';

declare module 'next-auth' {
    interface Session {
        accessToken?: string;
        user: {
            Email: string;
            Name: string;
            FullName: string;
            Phone: number;
            IsAdmin: boolean;
            IsBlocked: boolean;
            profileImage: string;
            Password:string;
        }
    }

    interface User {
        access_token?: string;
        Email: string;
        Password: string;
        Name: string;
        FullName: string;
        Phone: number;
        IsAdmin: boolean;
        IsBlocked: boolean;
    }
}

const userAuthOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                Email: { label: 'Email', type: 'email' },
                Password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                try {
                    let response = await postLogin({ Email: credentials?.Email + "", Password: credentials?.Password + "" });
                    response.data = JSON.parse(response.data);
                    if (response.data) {
                        response.data.access_token = response.token;
                        return response.data;
                    }
                    return null;
                } catch (error) {
                    console.error('Error authenticating user:', error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: { token: JWT; user?: User }) {
            if (user) {
                token.accessToken = user.access_token;
                token.Email = user.Email;
                token.FullName = user.FullName;
                token.Name = user.Name;
                token.IsAdmin = user.IsAdmin;
                token.IsBlocked = user.IsBlocked;
                token.Password = user.Password
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            session.accessToken = token.accessToken as string;
            session.user = {
                Email: token.Email as string,
                Name: token.Name as string,
                FullName: token.FullName as string,
                Phone: token.Phone as number,
                IsAdmin: token.IsAdmin as boolean,
                IsBlocked: token.IsBlocked as boolean,
                profileImage: token.profileImage as string,
                Password:token.Password as string
            };
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: { signIn: '/user/login' },
};
 

const userHandler = NextAuth(userAuthOptions);

export { userHandler as GET, userHandler as POST };
