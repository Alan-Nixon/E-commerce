import { GraphQLClient } from 'graphql-request';
import { gql } from 'graphql-request';

const client = new GraphQLClient(process.env.NEXT_PUBLIC_BACKEND_URL || '');

export const postLogin = async (Data: { Email: string, Password: string }) => {
    try {
        const LOGIN_MUTATION = gql`
            mutation {
  login(Email: "test@example.com", Password: "password") {
    status
    token
    message
  }
}

        `;

        const data: any = await client.request(LOGIN_MUTATION, Data);
        console.log(data);
    } catch (error) {
        console.error(error);
    }
};

// Example call to postLogin
postLogin({ Email: "alannixon2520@gmail.com", Password: "alan@2520" });
