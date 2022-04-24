// import graphql from apollo server
const { gql } = require("apollo-server-express");

// this is basically where the models will be defined for gql
// models always start with a predefined id
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    tipCount: Int
    tipHistory: [Tip]
    percentages: [Percentage]
    password: String
  }

  type Tip {
    _id: ID
    tip: String
  }
  type Percentage {
    _id: ID
    percentage: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    tips: User
    percentages: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addTipHistory(tip: String!): User
    addPercentage(percentage: String!): User
  }
`;

// export the typeDefs
module.exports = typeDefs;
