import { gql } from '@apollo/client';

export const QUERY_POKEMON = gql`
query pokemoninfo {
    pokemoninfo {
        abilities
        game_indices
        types
        name
        sprites
        id
        _id
      }
}
`