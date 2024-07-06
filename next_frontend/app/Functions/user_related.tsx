import { GraphQLClient } from 'graphql-request';
import { gql } from 'graphql-request';

export const client = new GraphQLClient(process.env.NEXT_PUBLIC_BACKEND_URL + '');



export const postLogin = async (Data: { Email: string, Password: string }) => {
    try {

        const LOGIN_MUTATION = gql`mutation Login($Email: String!, $Password: String!) {
        login(Email: $Email, Password: $Password) { token message }
        }`

        const data:any = await client.request(LOGIN_MUTATION, Data)
        console.log(data.data,data.errors);
    } catch (error) {
        console.log(error);

    }
} 


postLogin({Email:"alannixon2520@gmail.com",Password:"alan@2520"});