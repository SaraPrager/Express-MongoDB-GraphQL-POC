const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type User {
    _id: ID!
    name: String!
    email: String!
    createdAt: String!
  }

  input UserInput {
    name: String!
    email: String!
  }

  type Query {
    users:[User!]
  }

  type Mutation {
    createUser(user:UserInput): User
  }

  schema {
    query: Query
    mutation: Mutation
  }
`)