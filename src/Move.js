import { React, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'
import './App.css';



export function Move(){
    const [moveData, setMoveData] = useState({})
    const { name } = useParams()

//Calls API for to get info for chosen move
    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/move/${name}`)
        .then(i => i.json())
        .then(i => setMoveData(i))
    }, [name])


//maps through which pokemon can learn the move and displays them
    const learnedByPokemon = moveData.learned_by_pokemon?.map(pokemon => <div key={pokemon.name}>
        <Link to={`/pokemon/${pokemon.name}`}><h3>{pokemon.name}</h3></Link>
      </div>)

//sets variables to display the different pieces of information
    const moveName = moveData.name?.toUpperCase() || ""
    const accuracy = moveData.accuracy || 0;
    const power = moveData.power || 0;
    const pp = moveData.pp || 0;
    const moveType = moveData.type?.name || "";
    const effectChance = moveData.effect_chance || ""

//maps through effect entries to list each one
    const effectOfMove = moveData.effect_entries?.map(entry => <p key={entry}>{entry.effect}</p>)

    return(
        <div id="move-display">
            <h1>Pokedex</h1>
            <Link to="/"><button>Home</button></Link>
            <h2>{moveName}</h2>
            <div id="move-info">
                
                <ul>
                    <li>Move Type: {moveType}</li>
                    <li>Accuracy: {accuracy}</li>
                    <li>PP: {pp}</li>
                    <li>Power: {power}</li>  
                    <li>Effect Chance: {effectChance}</li>
                </ul>
                {effectOfMove}
            </div>
            <div id="movesPokeList">
            <h3>Pokemon who can learn this move:</h3><br/>
            {learnedByPokemon}
            </div>
        </div>
    )
}