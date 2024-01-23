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
        }
    }
}

module.exports = resolvers