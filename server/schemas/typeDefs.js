const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Query {
    users: [User]!
}

type User {
    _id: ID
    username: String
    email: String
}

type Pokemnon {
    _id: ID
    name: String
    url: String
}
`

module.exports = typeDefs