import { gql } from 'graphql-request';


export const ADMIN_LOGIN = gql`
  mutation AdminLogin($Email:String!, $Password:String!){
    adminLogin(Email:$Email Password:$Password) {
      message status token data
    }
  }`


export const IS_ADMIN_AUTH = gql`
  mutation isAdminAuth($Token:String!) {
    isAdminAuth(Token:$Token) {
      message status token data
    }
  }`