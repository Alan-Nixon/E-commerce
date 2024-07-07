import { GraphQLClient } from 'graphql-request';
import { gql } from 'graphql-request';
import Cookies from 'js-cookie'

const getToken = () => "Bearer" + Cookies.get('userToken');

const client = new GraphQLClient(process.env.NEXT_PUBLIC_BACKEND_URL || '', {
    headers: { authorization: getToken() }
});


export const postLogin = async (Data: { Email: string, Password: string }): Promise<responseType> => {
    try {
        const LOGIN_MUTATION = gql`mutation Login($userLogin: userLogin!) { login(userLogin: $userLogin) { status message token } }`;

        const { login }: { login: responseType } = await client.request(LOGIN_MUTATION, {
            userLogin: { Email: Data.Email, Password: Data.Password }
        });

        return login
    } catch (error: any) {
        console.error('Login error:', error);
        return { status: false, message: error.message ?? "error" }
    }
};

postLogin({ Email: "alan nixon", Password: "skj" })