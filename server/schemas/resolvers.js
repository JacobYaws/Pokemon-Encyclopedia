const { User, PokemonInfo } = require('../models');

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