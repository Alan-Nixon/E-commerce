import { GraphQLClient } from 'graphql-request';
import Cookies from 'js-cookie'
import { ADMIN_LOGIN, LOGIN_MUTATION, REGISTER_MUTATION, USER_DETAILS } from './user_query_mutation';
import { signOut } from 'next-auth/react';

const getToken = () => "Bearer" + Cookies.get('userToken');

const client = new GraphQLClient(process.env.NEXT_PUBLIC_BACKEND_URL || '', {
    headers: { authorization: getToken() }
});

export const logout = () => { signOut({ callbackUrl: '/user/login' }) }

interface loginType {
    Email: string,
    Password: string
}

export const postLogin = async (Data: loginType): Promise<responseType> => {
    try {

        const { login }: { login: responseType } = await client.request(LOGIN_MUTATION, {
            userLogin: { Email: Data.Email, Password: Data.Password }
        });

        return login
    } catch (error: any) {
        console.error('Login error:', error);
        return { status: false, message: error.message ?? "error" }
    }
};

export const getUserDetails = async (Email: string) => {
    try {
        const { getUserDetails }: { getUserDetails: responseType } = await client.request(USER_DETAILS, { Email });
        console.log(JSON.parse(getUserDetails.data));
        return getUserDetails.data
    } catch (error: any) {
        console.log(error);
        return { status: false, message: error.message ?? "error" }
    }
}


export const postRegister = async (userRegister: userInterface) => {
    try {
        const { register }: any = await client.request(REGISTER_MUTATION, { userRegister })
        return register
    } catch (error) {
        console.log(error);
    }
}

export const adminLogin = async ({ Email, Password }: loginType) => {
    try {
        const { adminLogin }: { adminLogin: responseType } = await client.request(ADMIN_LOGIN, { Email, Password })
        return adminLogin
    } catch (error: any) {
        console.log(error);
        return { status: false, message: error.message ?? "Internal error occured", data: null, token: "" }
    }
}