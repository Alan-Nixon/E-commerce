import { GraphQLClient } from 'graphql-request';
import { gql } from 'graphql-request';
import Cookies from 'js-cookie'

const getToken = () => "Bearer" + Cookies.get('userToken');

const client = new GraphQLClient(process.env.NEXT_PUBLIC_BACKEND_URL || '', {
    headers: { authorization: getToken() }
});


export const postLogin = async (Data: { Email: string, Password: string }) => {
    try {

        const LOGIN_MUTATION = gql`
            mutation Login($Email: String!, $Password: String!) {
                login(loginData: { Email: $Email, Password: $Password }) { status token message }
            }`

        const { login }: { login: loginResponse } = await client.request(LOGIN_MUTATION, { Email: Data.Email, Password: Data.Password });
        console.log(login.token);

    } catch (error) {
        console.error('Login error:', error);
    }
};

