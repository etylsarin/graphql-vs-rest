import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    age: Int!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User!
  }

  type Mutation {
    createUser(name: String!, age: Int!): User!
    updateUser(id: ID!, name: String, age: Int): User!
    deleteUser(id: ID!): User!
  }
`;