import { useQuery } from '@apollo/client';
import { QUERY_POKEMON } from '../utils/queries';
import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Card } from 'react-bootstrap'

const Home = () => {
    const {data, loading, error} = useQuery(QUERY_POKEMON);
    const [pokeData, setPokeData] = useState(data?.pokemoninfo);


    useEffect(() => {
        if(data) {
        setPokeData(data.pokemoninfo)
        }
    })
    let newPokeObjectArray = [];
    // console.log(pokeData)
    pokeData?.forEach(element => {
        let elementName = element.name;
            let firstUpper = (elementName.charAt(0)).toUpperCase();
            let endName = elementName.slice(1);
            if (elementName.search('-') !== -1) {
                let hyphenIndex = elementName.search('-');
                let hyphenUpper = elementName.charAt(hyphenIndex + 1).toUpperCase();
                let endNameFirst = elementName.slice(1, hyphenIndex + 1);
                let endNameLast = elementName.slice(hyphenIndex + 2);
                endName = endNameFirst + hyphenUpper + endNameLast;
            }
        let newName = firstUpper + endName;


        let gameIndices = element.game_indices;
        let newGameIndicesArray = [];        
            gameIndices.forEach(game => {
            let firstUpper = game.charAt(0).toUpperCase();
            let endGame = game.slice(1);
            let newGameIndices = firstUpper + endGame
            newGameIndicesArray.push(newGameIndices);
        })


        let abilities = element.abilities;
        let newAbilitiesArray = [];        
            abilities.forEach(ability => {
            let firstUpper = ability.charAt(0).toUpperCase();
            let endAbility = ability.slice(1);
            if (ability.search('-') !== -1) {
                let hyphenIndex = ability.search('-');
                let hyphenUpper = ability.charAt(hyphenIndex + 1).toUpperCase();
                let endAbilityFirst = ability.slice(1, hyphenIndex + 1);
                let endAbilityLast = ability.slice(hyphenIndex + 2);
                endAbility = endAbilityFirst + hyphenUpper + endAbilityLast;
            }
            let newAbilities = firstUpper + endAbility
            newAbilitiesArray.push(newAbilities);
        })


        let types = element.types;
        let newTypesArray = [];
            types.forEach(type => {
                let firstUpper = type.charAt(0).toUpperCase();
                let endType = type.slice(1);
                let newType = firstUpper + endType
                newTypesArray.push(newType);
            })

        
        let newPokeObject = { name: newName, game_indices: newGameIndicesArray, id: element.id, sprites: element.sprites, abilities: newAbilitiesArray, types: newTypesArray}    
        newPokeObjectArray.push(newPokeObject);
    })
    console.log(newPokeObjectArray.sort())

    // const pokemonData = data?.pokemoninfo;

    // const processPokemonData = pokemonData?.forEach(element => {
    //     console.log(element.id)
    //     console.log(element.name)
    // })

    // useEffect(() => {
    //     useQuery(QUERY_POKEMON)
    // })


    // pokemonData.forEach(element => pokemonDataArray.push(element))
    // console.log(pokemonDataArray);
    // console.log(typeof pokemonData)
    return (
        
        <Container id="pokelist">
            {loading ? (
                <></>
         ) : (
            <Col>
            {newPokeObjectArray?.map((pokemon) => (
                <Card key={pokemon.id}>
        <Card.Header>{pokemon.name}</Card.Header>
        <Row className="card-row">
          
        <Card.Img src={pokemon.sprites}></Card.Img>
  
        <Card.Body>

        <Container id="abilities">
            {pokemon.abilities.map((abilities) => (
            <p className="mapped-item" key={abilities}>{abilities}</p>
        ))}
        </Container>

        <Container id="games">
            {pokemon.game_indices.map((games) => (
            <p className="mapped-item" key={games}>{games}</p>
        ))}
        </Container>
        
        <Container id="types">
            {pokemon.types.map((types) => (
            <p className="mapped-item" key={types}>{types}</p>
        ))}
        </Container>

        </Card.Body>
        </Row>
                </Card>
    ))}
        </Col>
        //     <div>
        //         {pokemonData.map((pokemon) => (
        //             <div>
        //     <li key={pokemon.id}><h1>{pokemon.name}</h1></li>
        //     <li><h2>{pokemon.abilities}</h2></li>
        //     <li><h3>{pokemon.game_indices}</h3></li>
            
        //     <li><h4>{pokemon.types}</h4></li>
        //     <li><h5>{pokemon.id}</h5></li>
            
        //             </div>
        // ))}
        //     </div>
         )}
        
        </Container>
    )
}

export default Home
