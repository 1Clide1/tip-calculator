// import graphql from apollo server
const { gql } = require("apollo-server-express");

// this is basically where the models will be defined for gql
// models always start with a predefined id
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    tipHistory: [Tip]
    percentages: [Percentage]
    password: String
  }

  type Tip {
    _id: ID
    tipId: String
    tip: Number
  }
  type Percentage {
    _id: ID
    percentageId: String
    percentage: Number
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addTipHistoy(tip: Number!): User
    addPercentage(percentage: Number!): User
  }
`;

// export the typeDefs
module.exports = typeDefs;
