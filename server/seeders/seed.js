const db = require('../config/connection');
const { Pokemon, PokemonInfo } = require('../models/');
const fs = require('fs');
// const profileSeeds = require('./profileSeeds.json');
const gen1Seeds = require('./gen1Seeds.json');
const gen1EachSeeds = require('./gen1EachSeeds.json')

db.once('open', async () => {

    try {
        await PokemonInfo.deleteMany({});
        await PokemonInfo.create(gen1EachSeeds);
    
        console.log('all done!');
        process.exit(0);
      } catch (err) {
        throw err;
      }

    ///// POKEMON SPECIFIC DATA SEEDER //////

    // let eachPokeArray = [];
    // gen1Seeds.forEach(element => {
    //     let pokeUrl = element.url;
    //     let prePokeId = pokeUrl.slice(42)
    //     let pokeId = prePokeId.replace("/", "");
    // // const responseData = fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}/`) THIS WORKS
    // // const responseData = fetch(`https://pokeapi.co/api/v2/pokemon/42/`) 
    // const responseData = fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}/`) 

    // .then(response => response.json())
    // .then(data => {
    // let abilities = data.abilities;
    // let game_indices = data.game_indices;
    // let sprites = data.sprites.front_default;
    // let id = data.id;
    // let name = data.name;
    // let types = data.types;
    // //    console.log(name); 
    // let processedTypesArray = []
    // let processedTypes = types.forEach(element => processedTypesArray.push(element.type))
    //     console.log(processedTypesArray)
    //    const individualPoke = {name: name, id: id, sprites: sprites, game_indices: game_indices, abilities: abilities, types: processedTypesArray}
    //    eachPokeArray.push(individualPoke)
    //   //  console.log(eachPokeArray);
    //    fs.writeFile('gen1EachSeeds.txt', JSON.stringify(eachPokeArray), (err) => {
    //     if (err) {
    //         console.log(err)
    //     }
    //    })
    // })
    // .catch(error => console.error(error))
    // }) 
   
    ///// END POKEMON SPECIFIC DATA SEEDER /////




/////// Seed from API response for Gen1 Pokemon (only names and url links to each individual pokemon)

    // let pokemonSpeciesArray = [];
    // const getPokeData = async () => {
    // const responseData = await fetch('https://pokeapi.co/api/v2/generation/1/')
    // .then(response => response.json())
    // .then(data => {
    //     let pokemon = data.pokemon_species;
    //     pokemon.forEach(element => {
    //         console.log(element.url)
    //         pokemonSpeciesArray.push(element)
    //     })
    // })
    // .catch(error => console.error(error))
    // }
    // getPokeData();

///////////////



});

