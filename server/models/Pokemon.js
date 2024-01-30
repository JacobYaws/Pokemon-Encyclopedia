const { Schema, model } = require("mongoose");

const pokemonSchema = new Schema({
        name: {
            type: String,
            required: true,
            unique: true,
        },
        url: {
            type: String,
            required: true,
            unique: true,
        }
    }
);

const Pokemon = model('Pokemon', pokemonSchema);

module.exports = Pokemon;