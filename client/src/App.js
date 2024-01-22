import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {

  const fetchData = async () => {
    // const responseData = await fetch('https://pokeapi.co/api/v2/pokemon-species/76/')
    const responseData = await fetch('https://pokeapi.co/api/v2/generation/1/')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error))
  }
  useEffect(() => {
    fetchData();
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
