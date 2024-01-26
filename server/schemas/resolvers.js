// const { AuthenticationError } = require('apollo-server-express');
const { User, PokemonInfo } = require('../models');
// const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async (parent, { userId }) => {
            return User.find()
        },
        pokemoninfo: async () => {
            return PokemonInfo.find()
        },
        singlepokemoninfo: async (parent, { name }) => {
            console.log(name)
            return PokemonInfo.findOne({ name: name })
        },
    }
}

module.exports = resolvers