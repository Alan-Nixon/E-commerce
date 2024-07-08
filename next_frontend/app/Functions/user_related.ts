import { GraphQLClient } from 'graphql-request';
import Cookies from 'js-cookie'
import { LOGIN_MUTATION } from './user_query_mutation';

const getToken = () => "Bearer" + Cookies.get('userToken');

const client = new GraphQLClient(process.env.NEXT_PUBLIC_BACKEND_URL || '', {
    headers: { authorization: getToken() }
});


export const postLogin = async (Data: { Email: string, Password: string }): Promise<responseType> => {
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

