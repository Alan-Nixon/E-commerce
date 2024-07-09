// app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions, Session, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';
import { postLogin } from '@/app/Functions/user_related';

declare module 'next-auth' {
    interface Session {
        accessToken?: string;
    }

    interface User {
        access_token?: string;
        Email: string
        Password: string,
        Name: string
        FullName: string
        Phone: number,
        IsAdmin: boolean,
        IsBlocked: boolean,
    }
}

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: { Email: { label: 'Email', type: 'email' }, Password: { label: 'Password', type: 'password' } },
            
            async authorize(credentials) {
                try {
                    let response = await postLogin({ Email: credentials?.Email + "", Password: credentials?.Password + "" });
                    response.data = JSON.parse(response.data)
                    if (response.data) {
                        response.data.access_token = response.token
                        return response.data
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
                token.Email = user.Email
                token.FullName = user.FullName
                token.Name = user.Name
                token.IsAdmin = user.IsAdmin

            }
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            session.accessToken = token.accessToken as string;
            return session;
        },
    },
    secret: 'your-secret-key',
    pages: { signIn: '/user/login' }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };



// {
//     name: undefined,
//     email: undefined,
//     picture: undefined,
//     sub: undefined,
//     accessToken: 'token ind'
//   } {
//     Email: 'alannixon2520@gmail.com',
//     Password: '$2b$10$WaqD5Lrg9zZZ4.DuH7pr3.4wkS0sLBMlysYdrvupdvX95g2NQavh2',
//     Name: 'alan',
//     FullName: 'alan nixon',
//     Phone: 6282995964,
//     IsAdmin: true,
//     IsBlocked: true,
//     access_token: 'token ind'
//   } this is very important /////////
//    POST /api/auth/callback/credentials 200 in 7444ms
//    GET /api/auth/session 200 in 57ms
