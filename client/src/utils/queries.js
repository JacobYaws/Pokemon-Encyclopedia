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
export const QUERY_SINGLE_POKEMON = gql`
query singlepokemoninfo($name: String) {
    singlepokemoninfo(name: $name) {
      abilities
      game_indices
      types
      name
      sprites
      id
      _id
    }
}`