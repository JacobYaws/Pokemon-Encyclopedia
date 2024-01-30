import { useQuery } from '@apollo/client';
import { QUERY_POKEMON } from '../utils/queries';
import React, { useState, useEffect } from 'react';
import { Container, Button, Form, Nav, Navbar, Row, Col } from 'react-bootstrap'



function Header() {

  const {data, loading, error} = useQuery(QUERY_POKEMON);
  const pokemoninfo = data?.pokemoninfo;
  const [pokemonList, setPokemonList] = useState(pokemoninfo)
  const [searching, setSearching] = useState(false);
  let searchIO = 0;
  useEffect(() => {
    setPokemonList();
  }, [])


  const handleChange = (event) => {
    console.log(event.target.value)
    const searchValue = event.target.value;
    if (searchValue !== '') {
      setSearching(true)
    } else {
      setSearching(false)
    }

    const filterSearch = pokemoninfo?.filter((item) => {
      const name = item.name
      if (name.toLowerCase().includes(searchValue.toLowerCase())) {
        console.log(name)
        return name
      }
    });

    setPokemonList(filterSearch);

  
  }

  const handleFormSubmit = (event) => {
    console.log(event.target.innerText)
    const search = document.getElementById('searchbar').value.toLowerCase();
    const clickEvent = event.target.innerText;

    let findPokemon = pokemoninfo.find(element => {
      if (element.name === search) {
        console.log(true)
        window.location.href = `/pokemon/${search}`
        // return true
      } else if (element.name === clickEvent) {
        window.location.href = `/pokemon/${clickEvent}`

      } else {
        console.log(false)
      }
      
    })

    

    console.log(search);
    console.log(pokemoninfo);
  }
    console.log(pokemonList)
    return (
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container id="navbar-container" fluid>
          <Navbar.Brand href="/" id="main-brand">PokeDex</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="/">
                Home
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Col >
              <Form.Control
                id="searchbar"
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={handleChange}
              >
                </Form.Control>
                <Col id="search-bar-container" className='me-2'>
            {searching ? (<><div id="search-bar-results">
              {pokemonList.map(pokemon => (
                <li onClick={handleFormSubmit}>{pokemon.name}</li>
              ))}</div></>) : (<></>)}
            </Col>
            </Col>
              <Button variant="outline-success" onClick={handleFormSubmit}>Search</Button>
              

            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
  
  export default Header;