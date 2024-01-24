import { useQuery } from '@apollo/client';
import { QUERY_POKEMON } from '../utils/queries';
import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Card, Badge, Accordion } from 'react-bootstrap'
import Header from "../components/Header"

const Home = () => {
    const {data, loading, error} = useQuery(QUERY_POKEMON);
    const [pokeData, setPokeData] = useState(data?.pokemoninfo);


    useEffect(() => {
        if(data) {
        setPokeData(data.pokemoninfo)
        }
    })
    let newPokeObjectArray = [];
    let newPokeData;
    newPokeData = pokeData;
    let newPokeDataArray = [];
    newPokeDataArray = newPokeData?.slice().sort((a, b) => a.id - b.id)
    newPokeDataArray?.forEach(element => {
        console.log(element)
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
    // console.log(newPokeObjectArray.sort())

    return (
        <>
        <Header />
        
        <Container id="pokelist">
            {loading ? (
                <></>
         ) : (
            // <Row id="card-container">
            <Row className="card-container">
            {newPokeObjectArray?.map((pokemon) => (
                <Col id="cardcol" md='3'>
            <Card className="pokeinfo" key={pokemon.id} border='dark'>
        <Card.Header>{pokemon.name} <span>ID: {pokemon.id}</span></Card.Header>
        <Row className="image-stats">
            <Col id="photo">
        <Card.Img src={pokemon.sprites}></Card.Img>
        </Col>
        <Card.Body>
          
        <Accordion defaultActiveKey={[]} alwaysOpen>
            <Accordion.Item eventKey='0'>
                <Accordion.Header>Abilities</Accordion.Header>
                <Accordion.Body>
                {pokemon.abilities.map((abilities) => (
                
                <div className="mapped-item" key={abilities}><Badge id="abilities-badge">{abilities}</Badge></div>
            ))}
            </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey='1'>
                <Accordion.Header>Game Versions</Accordion.Header>
                <Accordion.Body>
                {pokemon.game_indices.map((games) => (
                
                <div className="mapped-item" key={games}><Badge id="games-badge">{games}</Badge></div>
            ))}
            </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey='2'>
                <Accordion.Header>Types</Accordion.Header>
                <Accordion.Body>
                {pokemon.types.map((types) => (
                
                <div className="mapped-item" key={types}><Badge id="types-badge">{types}</Badge></div>
            ))}
            </Accordion.Body>
            </Accordion.Item>

        </Accordion>
 
        </Card.Body>
        </Row>
                </Card>
                </Col>
    ))}
        </Row>
  
         )}
        
        </Container>
        </>
    )
}

export default Home
