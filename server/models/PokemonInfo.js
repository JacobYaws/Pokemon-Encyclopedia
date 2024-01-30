const { Schema, model } = require('mongoose');

const pokemonInfoSchema = new Schema(
    { 
        abilities: [
            {
                type: String,
                required: true,
            }
        ],
        game_indices: [
            {
                        type: String,
                        required: true,
            }
        ],
        sprites: {
                type: String,
                required: true,
        },
        id: {
            type: Number,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
            unique: true,
        },
        types: [
            {
                        type: String,
                        required: false,
            }
        ]
    }
);

const PokemonInfo = model('PokemonInfo', pokemonInfoSchema);

  module.exports = PokemonInfo;