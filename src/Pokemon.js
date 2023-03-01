import {React, useEffect, useState} from 'react'
import './App.css';
import { useParams, Link } from 'react-router-dom';


export function Pokemon(){
    const { name } = useParams()
    const [pokemon, setPokemon] = useState({})

//Filters through the sprites to get each sprite name
    const spriteObjects = Object.entries(pokemon.sprites || {})
    .filter(([key, value]) => typeof value === "string")
    
//Calls pokeapi and sets the pokemon based on their name
    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(i => i.json())
        .then(i => setPokemon(i))
    }, [name])
    
    
//filters through and maps out each sprite name and image into a list item
    const sprites = spriteObjects.map(([key, value]) => {
        return (<li id="sprites" key={spriteObjects[key]}>
            <img src={value} alt="sprite"/>
            <h3>{key}</h3>
        </li>
    )})

//filters and maps through the sprites and returns the 1 that matches "front_default for the main picture"
    const pic = spriteObjects.map(([key, value]) => {
        if(key === "front_default"){
        return <img src={value} alt={pokemon.name} id="pokePic"/>
        }
    })

//maps through the pokemon's abilities and puts each one into a list item
    const abilities = Object.entries(pokemon.abilities || [])
    .map(([key, value]) => {
        return (
            <li key={pokemon.abilities[key]}><b>{key}- {pokemon.abilities[key].ability.name}</b></li>
        )
    })

//maps through the pokemon's moves and puts each one into a list item
    const moves = Object.entries(pokemon.moves || [])
    .map(([key, value]) => {
        return (
            <Link to={`/move/${pokemon.moves[key].move.name}`} key={pokemon.moves[key]}><li >{pokemon.moves[key].move.name}</li></Link>
        )
    })

//maps through pokemons types and puts each one into a list item
    const types = Object.entries(pokemon.types || [])
    .map(([key, value]) => {
        return (
            <li key={pokemon.types[key]}><b>{key}- {pokemon.types[key].type.name}</b></li>
        )
    })
    
    //Sets the name of the pokemon selected
    const pokeName = pokemon.name?.toUpperCase() || ""
  
    console.log(pokemon)
    return(
        <div>
            <h1>Pokedex</h1>
            <Link to="/"><button>Home</button></Link>
            <h2>{pokeName}</h2>
            
        <div id="pokedex-data"> 
            <div id="poke-hero">
                {pic}  
            <div id="poke-info">
                <div>
                    <h3>Height: {pokemon.height}m</h3>
                    <h3>Weight: {pokemon.weight}km</h3>
                </div>
                <div>
                    <h3>Types:</h3>
                    {types}
                </div>
                <div id="abilities">
                    <h3>Abilities:</h3>
                    <ol id="abilities">
                        {abilities}
                    </ol>
                </div>
            </div>  
                </div> 
                <div>
                    <h3>Moves:</h3>
                    <ol id="moves">
                        {moves}
                    </ol>
                </div>
                <div>
                    <ol id="spites">
                        {sprites}
                    </ol>
                </div>
        </div>
            
        </div>
    )
    
}