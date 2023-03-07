import { React, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'


export function Ability(){
    const { ability }  = useParams()
    const [abilityInfo, setAbilityInfo] = useState({});


//Calls the api for the chose ability
    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/ability/${ability}/`)
        .then(i => i.json())
        .then(i => setAbilityInfo(i))
        .catch(error => console.log(error))
    }, [ability])

    
//filters through the effect entries to return the entry that is in english and then maps it to a <p>
    const abilityEffect = abilityInfo.effect_entries?.filter(ability => ability.language.name === "en").map(a => <p key={abilityInfo.name}>{a.effect}</p>)


//Maps through the pokemon that know this ability
    const pokemonWithAbility = abilityInfo.pokemon?.map(pokemon => <div key={pokemon.pokemon.name}>
        <Link to={`/pokemon/${pokemon.pokemon.name}`}><h3>{pokemon.pokemon.name}</h3></Link>
    </div>)

    return (
        <div>
            <h1>Pokedex</h1>
            <Link to="/"><button>Home</button></Link>

            <h2>Ability Name: {abilityInfo.name?.toUpperCase()}</h2>
            {abilityEffect}

            <div id="ability-list">
                <h3>Pokemon with this ability:</h3>
                {pokemonWithAbility}
            </div>
        </div>
    )
}
