import { gql } from 'graphql-request';

export const LOGIN_MUTATION = gql`mutation Login($userLogin: userLogin!) { login(userLogin: $userLogin) { status message token data } }`;
