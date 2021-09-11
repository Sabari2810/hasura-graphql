export const CREATE_USER = gql`
  mutation createUser($email: String = "", $username: String = "") {
    insert_users_one(object: { email: $email, username: $username }) {
      id
      email
      username
    }
  }
`;
