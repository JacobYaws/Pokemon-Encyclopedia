const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Query {
    users: [User]!
    pokemoninfo: [PokemonInfo]
    singlepokemoninfo(name: String): PokemonInfo
    pokemon: [Pokemon]
}

type User {
    _id: ID
    username: String
    email: String
}

type Pokemon {
    _id: ID
    name: String
    url: String
}

type Abilities {
    ability: [Ability]
}
type Ability {
    name: String
}


type Game_Indices {
    version: String
}

type Types {
    name: String
}


type PokemonInfo {
    _id: ID
    id: Int
    sprites: String
    name: String
    abilities: [String]
    game_indices: [String]
    types: [String]
}




`

module.exports = typeDefs

// game_indices: [
//     {
//         version: {
//             name: String
//         }
//         _id: ID

//     }
// ]
// sprites: String
// id: Int
// name: String
// types: [
//     {
//         type: {
//             name: String
//         }
//         _id: ID

//     }
// ]
// }