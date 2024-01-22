const { Schema, model } = require('mongoose');

const pokemonInfoSchema = new Schema(
    { 
        abilities: [
            {
                ability: {
                    name: {
                        type: String,
                        required: true,
                    }
                }
            }
        ],
        game_indices: [
            {
                version: {
                    name: {
                        type: String,
                        required: true,
                    }
                }
            }
        ],
        sprites: {
            // front_default: {
                type: String,
                required: true,
            // }
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
                slot: {
                    type: Number,
                    required: true,
                },
                type: {
                    name: {
                        type: String,
                    }
                }
            }
        ]
    }
    // { 
    //     abilities: [
    //         {
    //             type: String,
    //             required: true,
    //         }
    //     ],
    //     game_indices: [
    //         {
    //             type: String,
    //             required: true,
    //         }
    //     ],
    //     sprites: {
    //         type: String,
    //         required: true,
    //     },
    //     color: {
    //         type: String,
    //         required: true,
    //     },
    //     generation: {
    //             type: String,
    //             required: true,
    //     },
    //     habitat: {
    //             type: String,
    //             required: true,
    //     },
    //     id: {
    //         type: Number,
    //         required: true,
    //         unique: true,
    //     },
    //     name: {
    //         type: String,
    //         required: true,
    //         unique: true,
    //     }
    // }
);

const PokemonInfo = model('PokemonInfo', pokemonInfoSchema);

  module.exports = PokemonInfo;