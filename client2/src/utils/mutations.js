import { gql } from "@apollo/client";
// mutation to login a user
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;
// mutation to add a user
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;
// mutation to add tips that the user makes to the user
export const ADD_TIP_HISTORY = gql`
  mutation addTipHistory($tip: String!) {
    addTipHistory(tip: $tip) {
      _id
      username
      tipHistory {
        tip
      }
    }
  }
`;
// mutation to add percentage the user picks to the user
export const ADD_PERCENTAGE = gql`
  mutation addPercentage($percentage: String!) {
    addPercentage(percentage: $percentage) {
      _id
      username
      percentages {
        percentage
      }
    }
  }
`;
