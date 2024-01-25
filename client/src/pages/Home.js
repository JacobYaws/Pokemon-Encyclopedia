import { useQuery } from '@apollo/client';
import { QUERY_POKEMON } from '../utils/queries';
import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Card, Badge, Accordion, AccordionBody, Form } from 'react-bootstrap'
import Header from "../components/Header"

let filterArray = [];
let filteredResultsArray = [];

const Home = () => {


    const {data, loading, error} = useQuery(QUERY_POKEMON, {staleTime: 60000});
    const [pokeData, setPokeData] = useState(data?.pokemoninfo);
    const [filters, setFilters] = useState(filterArray);
    const [checked, setChecked] = useState(false);
    const [processedFilteredArray, setProcessedFilterArray] = useState(filteredResultsArray);
    useEffect(() => {
        if(data) {
        setPokeData(data?.pokemoninfo.slice().sort((a, b) => a.id - b.id))
        }
        setFilters(filterArray);
        setProcessedFilterArray(filteredResultsArray)

    }, [data])
    // console.log(filters.length)

    // let processedFilteredArray = [];

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
                setChecked(switchChecked)
                let filterObject = {filterName: switchName, filterId: switchId, filterChecked: switchChecked}

                if (switchChecked === true) { 
                filterArray.push(filterObject)
                setFilters(filterArray)
                } else {
                    filterArray.splice(filterArray.findIndex(element => element.filterName == switchName), 1)
                    setFilters(filterArray);
                }
                let testArray = []
                filters.forEach(filter => {
                    let id = filter.filterId;
                    let name = filter.filterName;
                    
                    if (id === 'type-switch') {
                // filteredResultsArray.filter(item => {
                   
                        
                //     if (item.types.includes(name)) {
                //         console.log('yes')
                //     }})
                        newPokeObjectArray.filter((element) => {
                            // console.log(filteredResultsArray)
                            // console.log(!filteredResultsArray.some(item => item = element))
                            // console.log(element)
                            let pokeElement = element
                            console.log(pokeElement)
                            console.log(filteredResultsArray.find(item => console.log(newPokeObjectArray.some(item))))
                            if (element.types.indexOf(name) !== -1 && (filteredResultsArray.find(item => item == pokeElement) == undefined)) {
                                filteredResultsArray.push(element);
                            } 
                        })
                    } else if (id === 'ability-switch') {
                        console.log(name);
                        console.log(newPokeObjectArray)
                        newPokeObjectArray.filter((element) => {
                            if (element.abilities.indexOf(name) == -1) {
                                console.log("hit")
                                filteredResultsArray.push(element);
                            }
                        })
    
                    }
    
                })
                console.log(filteredResultsArray)
                // filteredResults();
                // console.log(filteredResultsArray)

    }
    // const filteredResults = () => {
    //     console.log(newPokeObjectArray)
    //     console.log(filteredResultsArray)
    //     // newPokeObjectArray.some(item => console.log(filteredResultsArray?.includes(item)))

    //         console.log(filteredResultsArray)
    //         filters.forEach(filter => {
    //             const id = filter.filterId;
    //             const name = filter.filterName;
    //             if (id === 'type-switch') {
    //                 newPokeObjectArray.filter((element) => {
    //                     // console.log(filteredResultsArray.findIndex(element))
    //                     if (element.types.indexOf(name) !== -1) {
    //                         filteredResultsArray.push(element);
    //                     } 
    //                 })
    //             } else if (id === 'ability-switch') {
    //                 console.log(name);
    //                 console.log(newPokeObjectArray)
    //                 newPokeObjectArray.filter((element) => {
    //                     if (element.abilities.indexOf(name) == -1) {
    //                         console.log("hit")
    //                         filteredResultsArray.push(element);
    //                     }
    //                 })

    //             }

    //         })
    // }
    return (
        <>
        <Header />
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
                            // <div>{ability}</div>
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
                            //   value={ability}
                            //   defaultChecked={switchState}
                              onChange={handleChange}
                            /></Form>
                            // <div>{ability}</div>
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
            
            {filters.length == 0 ? ( 
            <>
            {newPokeObjectArray?.map((pokemon) => (
                <Col id="cardcol" md='4'>
                    
            <Card className="pokeinfo" key={pokemon.id} border='dark' style={{display: pokemon.hidden ? 'none' : 'show'}}>
        <Card.Header>{pokemon.name} <span>ID: {pokemon.id}</span></Card.Header>
        <Row className="image-stats">
            <Col id="photo">
        <Card.Img src={pokemon.sprites}></Card.Img>
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


    </>
    ) : (
        <>Hello</>
    )}
        </Row>
  
         )}
        
        </Container>
        </Col>
        </Row>


        {/* <Form>
      <Form.Check // prettier-ignore
        type="switch"
        id="custom-switch"
        label="Check this switch"
      /></Form>
      <Form>
      <Form.Check // prettier-ignore
        type="switch"
        id="custom-switch"
        label="Check this switch"
      /></Form> */}


        </>
    )
}

export default Home
