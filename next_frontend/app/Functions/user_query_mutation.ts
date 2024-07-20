import { gql } from 'graphql-request';

export const LOGIN_MUTATION = gql`mutation Login($userLogin: userLogin!) { login(userLogin: $userLogin) { status message token data } }`;

export const USER_DETAILS = gql`mutation { getUserDetails (Email: "alannixon2520@gmail.com") { status message data }}`

export const REGISTER_MUTATION = gql``