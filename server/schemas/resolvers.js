const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async (parent, { userId }) => {
            return User.find()
        }
    }
}

module.exports = resolvers