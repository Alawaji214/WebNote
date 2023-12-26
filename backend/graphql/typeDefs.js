const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Note {
    id: ID!
    content: String!
    userId: ID!
  }

  type Query {
    notes: [Note]
    note(id: ID!): Note
  }

  type Mutation {
    addNote(content: String!, userId: ID!): Note
    updateNote(id: ID!, content: String!): Note
    deleteNote(id: ID!): Note
  }
`;

module.exports = typeDefs;
