import { useQuery } from '@apollo/client';
import { QUERY_POKEMON } from '../utils/queries';
import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Card, Badge, Accordion, AccordionBody, Form } from 'react-bootstrap'
let filterArray = [];
let filteredResultsArray = [];

const Home = () => {

    const {data, loading, error} = useQuery(QUERY_POKEMON, {staleTime: 60000});
    const [pokeData, setPokeData] = useState(data?.pokemoninfo);
    const [filters, setFilters] = useState(filterArray);
    const [filterClick, setFilterClick] = useState(false);
    const [processedFilteredArray, setProcessedFilterArray] = useState(filteredResultsArray);
    useEffect(() => {
        if(data) {
        setPokeData(data?.pokemoninfo.slice().sort((a, b) => a.id - b.id))
        }
        setFilters(filterArray);
        setProcessedFilterArray(filteredResultsArray)

    }, [data])
    console.log(filters)

    let abilitiesArray = [];
    let typesArray = [];
    let newPokeObjectArray = [];
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
                    abilitiesArray.push(newAbilities);
                })
                let types = element.types;
                let newTypesArray = [];
                    types.forEach(type => {
                        let firstUpper = type.charAt(0).toUpperCase();
                        let endType = type.slice(1);
                        let newType = firstUpper + endType
                        newTypesArray.push(newType);
                        typesArray.push(newType);
                    })
                let newPokeObject = { name: newName, game_indices: newGameIndicesArray, id: element.id, sprites: element.sprites, abilities: newAbilitiesArray, types: newTypesArray, hidden: false}    
                newPokeObjectArray.push(newPokeObject);
            })
            let protoAbilitiesFilters = [];
            let protoTypesFilters = [];
            abilitiesArray.forEach((element) => {
                if (protoAbilitiesFilters.indexOf(element) === -1) {
                protoAbilitiesFilters.push(element);
                }
            })
            typesArray.forEach((element) => {
                if (protoTypesFilters.indexOf(element) === -1) {
                protoTypesFilters.push(element);
                }
            })
    let abilitiesFilters = protoAbilitiesFilters.sort();
    let typesFilters = protoTypesFilters.sort();




    // let selectedAbilityFilters = [];       SET AT TOP OF FUNCTION
    // let selectedTypeFilters = [];          SET AT TOP OF FUNCTION

           
            const handleChange = (e) => {
                e.persist();
                let switchName = e.target.parentElement.innerText;
                let switchId = e.target.id;
                let switchChecked = e.target.checked;
                console.log(switchName)
                console.log(switchChecked)
                setFilterClick(!filterClick)
                let filterObject = {filterName: switchName, filterId: switchId, filterChecked: switchChecked}

                if (switchChecked === true) { 
                    console.log("here")
                    filterArray.push(filterObject)
                    setFilters(filterArray)
                } else {
                    filterArray.splice(filterArray.findIndex(element => element.filterName == switchName), 1)
                    setFilters(filterArray);
                }

    }
        const handleClick = (event) => {
            const targetName = event.currentTarget.id.toLowerCase();
            console.log(targetName)
            window.location.href = `/pokemon/${targetName}`
        }
    return (
        <>
        <Row>
            <Col id="filters" md='2'>
                <h3>Filters</h3>
               
                <Accordion id="filter-accordion" defaultActiveKey={[]} alwaysOpen>
                <Accordion.Item id="filter-item" eventKey='0'>
                    <Accordion.Header className="filter-tab">Types</Accordion.Header>
                    <AccordionBody>
                        {typesFilters.map((type) => (
                            <Form>
                            <Form.Check // prettier-ignore
                            //   checked={checked}
                              type="switch"
                              id="type-switch"
                              label={`${type}`}
                              key={`${type}`}
                              onChange={handleChange}
                            /></Form>
                        ))}
                    </AccordionBody>
                </Accordion.Item>
                <Accordion.Item id="filter-item"eventKey='1'>
                    <Accordion.Header className="filter-tab">Abilities</Accordion.Header>
                    <AccordionBody>
                        {abilitiesFilters.map((ability) => (
                            <Form>
                            <Form.Check // prettier-ignore
                            //   checked={false ? formState}
                              type="switch"
                              id="ability-switch"
                              label={`${ability}`}
                              key={`${ability}`}
                              onChange={handleChange}
                            /></Form>
                        ))}
                    </AccordionBody>
                </Accordion.Item>
                
                </Accordion>
                
            </Col>
        

        <Col md='10'>
        <Container id="pokelist">
            {loading ? (
                <></>
         ) : (
            // <Row id="card-container">
            <Row className="card-container">
            {newPokeObjectArray?.filter((pokemon) => {
                let displayPokemon = false
                filters.forEach((filter) => {
                    console.log("filter loop: " + filter.filterName)
                    console.log(displayPokemon)
                    let filterMatchCount = 0
                    if(!displayPokemon) {
                        console.log(filter)
                        switch(filter.filterId) {
                            case ("ability-switch") :
                                console.log("ability filter")
                                if(pokemon.abilities?.find((ability) => ability == filter.filterName)) {
                                    filterMatchCount++
                                }
                                break;
                            case ("type-switch") :
                                console.log("type filter")
                                if(pokemon.types?.find((type) => type == filter.filterName)) {
                                    filterMatchCount++
                                }
                                break;
                        }
                        displayPokemon = filterMatchCount > 0
                }
                })
                console.log(displayPokemon)
                return displayPokemon || filters.length == 0
            }).map((pokemon) => (
                <Col id="cardcol" md='4'>
            <Card className="pokeinfo" key={pokemon.id} border='dark' >
        <Card.Header>{pokemon.name} <span>ID: {pokemon.id}</span></Card.Header>
        <Row className="image-stats" onClick={handleClick} id={pokemon.name}>
            <Col id="photo" >
        <Card.Img src={pokemon.sprites} ></Card.Img>
        </Col>
        <Card.Body>
            <Accordion defaultActiveKey={[]} alwaysOpen>
                <Accordion.Item className="general-info" eventKey='0'>
                    <Accordion.Header className="info-tab">Abilities</Accordion.Header>
                    <Accordion.Body className="general-info-body">
                    {pokemon.abilities.map((abilities) => (
                    <div className="mapped-item" key={abilities}><Badge id="abilities-badge">{abilities}</Badge></div>
                ))}
                </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item className="general-info" eventKey='1'>
                    <Accordion.Header className="info-tab">Game Versions</Accordion.Header>
                    <Accordion.Body className="general-info-body">
                    {pokemon.game_indices.map((games) => (
                    <div className="mapped-item" key={games}><Badge id="games-badge">{games}</Badge></div>
                ))}
                </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item className="general-info" eventKey='2'>
                    <Accordion.Header className="info-tab">Types</Accordion.Header>
                    <Accordion.Body className="general-info-body">
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
        </Col>
        </Row>
        </>
    )
}

export default Home;
