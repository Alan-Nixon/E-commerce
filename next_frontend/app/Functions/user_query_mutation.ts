import { gql } from 'graphql-request';

export const LOGIN_MUTATION = gql`
  mutation Login($userLogin: userLogin!) { 
    login(userLogin: $userLogin) {
      status
      message
      token 
      data
    } 
  }
`;

export const USER_DETAILS = gql`
  mutation UserDetails($Email: String!) {
    getUserDetails(Email: $Email) {
      status
      message
      data
    }
  }
`;

export const REGISTER_MUTATION = `
  mutation Register($userRegister: UserRegister!) {
    register(userRegister: $userRegister) {
      status
      message
      data
    }
  }
`;