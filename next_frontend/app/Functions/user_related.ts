import { GraphQLClient } from 'graphql-request';
import Cookies from 'js-cookie'
import { CHANGE_IMAGE, LOGIN_MUTATION, REGISTER_MUTATION, USER_DETAILS } from './user_query_mutation';
import { signOut } from 'next-auth/react';

const getToken = () => "Bearer" + Cookies.get('userToken');

export const client = new GraphQLClient(process.env.NEXT_PUBLIC_BACKEND_URL || '', {
    headers: { authorization: getToken() }
});

export const logout = () => { signOut({ callbackUrl: '/user/login' }) }



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


export const uploadImage = async (file: File) => {
    try {
        const result = await client.request(CHANGE_IMAGE, { file })
        console.log(result)
        return result
    } catch (error: any) {
        console.log(error);
        return { status: false, message: error.message ?? "Internal error occured", data: null, token: "" }
    }
}