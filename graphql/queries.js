import gql from "graphql-tag";

export const USERS_QUERY = gql`
  query fetchUsers {
    users {
      id
      username
      email
    }
  }
`;
