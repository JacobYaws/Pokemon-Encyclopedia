import { useQuery } from '@apollo/client';
import { Navigate, useParams } from 'react-router-dom';
import { QUERY_SINGLE_POKEMON } from '../utils/queries';
import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Image } from 'react-bootstrap';

const Pokemon = () => {
    const {name: name} = useParams();
    // console.log(pokeName)
    const { data, loading, error } = useQuery(
        name ? QUERY_SINGLE_POKEMON : QUERY_SINGLE_POKEMON,
    {
        variables: {name: name},
    }
    );

    console.log(data)

    
    const pokemonInfo = data?.singlepokemoninfo
    console.log(pokemonInfo)
    let abilitiesArray = [];
    let typesArray = [];
    let newPokeObject = {};
        if (pokemonInfo !== undefined) {
    let pokeName = pokemonInfo?.name;

                    let firstUpper = (pokeName.charAt(0)).toUpperCase();
                    let endName = pokeName.slice(1);
                    if (pokeName.search('-') !== -1) {
                        let hyphenIndex = pokeName.search('-');
                        let hyphenUpper = pokeName.charAt(hyphenIndex + 1).toUpperCase();
                        let endNameFirst = pokeName.slice(1, hyphenIndex + 1);
                        let endNameLast = pokeName.slice(hyphenIndex + 2);
                        endName = endNameFirst + hyphenUpper + endNameLast;
                    }
                let newName = firstUpper + endName;


                let pokeGameIndices = pokemonInfo.game_indices;
                let newGameIndicesArray = [];        
                pokeGameIndices.forEach(game => {
                    let firstUpper = game.charAt(0).toUpperCase();
                    let endGame = game.slice(1);
                    let newGameIndices = firstUpper + endGame
                    newGameIndicesArray.push(newGameIndices);
                })


                let pokeAbilities = pokemonInfo.abilities;
                let newAbilitiesArray = [];        
                    pokeAbilities.forEach(ability => {
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
                    abilitiesArray.push(newAbilities);
                })
                let pokeTypes = pokemonInfo.types;
                let newTypesArray = [];
                    pokeTypes.forEach(type => {
                        let firstUpper = type.charAt(0).toUpperCase();
                        let endType = type.slice(1);
                        let newType = firstUpper + endType
                        newTypesArray.push(newType);
                        typesArray.push(newType);
                    })
                newPokeObject = { name: newName, game_indices: newGameIndicesArray, id: pokemonInfo.id, sprites: pokemonInfo.sprites, abilities: newAbilitiesArray, types: newTypesArray, hidden: false}    
                // newPokeObjectArray.push(newPokeObject);
            }
            console.log(newPokeObject)
    return (
        <>
        {loading ? (<></>) : ( 
        <Container id="single-container">
            <Col>

            <Row>
                <Col md='4' id="single-img-col">
                <Image id="single-img" src={newPokeObject.sprites}>
                    </Image>
                    <Row>
                        {newPokeObject.name}
                    </Row>
                    </Col>
                    <Col>
                    <p>More general info</p>
                    <Row>
                    {newPokeObject.id}
                    </Row>
                    <Row>
                    {newPokeObject.abilities}
                    </Row>
                    </Col>

            </Row>

            </Col>
        </Container>)}
        </>
       
        
    );
};

export default Pokemon;