import {React, useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';




export function Home(){
//sets states
    const [pokemon, setPokemon] = useState({});
    const [search, setSearch] = useState("");
    const [type, setType] = useState("all")
    const [pokemonTypes, setPokemonTypes] = useState({})

    const navigate = useNavigate();

//calls the API to get a full list of pokemon
    useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
    .then(i => i.json())
    .then(i =>setPokemon(i))
  }, [])

//calls the API if a type of pokemon is selected 
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/type/${type}`)
    .then(j => j.json())
    .then(j =>setPokemonTypes(j))
  }, [type])

//maps through the results of the pokemon API being called and lists each pokemon
    const pokemonList = pokemon.results?.map(i => <div>
      <Link to={`/pokemon/${i.name}`}><h3>{i.name}</h3></Link>
    </div>)

//maps through the reulse of the pokemonTypes if a type is selected
    const typeList = pokemonTypes.pokemon?.map(j => <div>
      <Link to={`/pokemon/${j.pokemon.name}`}><h3>{j.pokemon.name}</h3></Link>
    </div>)


//Handles sumbission of the search form
    const handleSubmit = event => {
      event.preventDefault();
      navigate(`/pokemon/${search}`)
      
    }
    
  
  
  
  
  console.log(pokemon)
      

  return (
    <div className="App">
      <h1>Pokedex</h1>

    <form onSubmit={handleSubmit}>
      <input type="text" value={search} onChange ={e => setSearch(e.target.value.toLowerCase())}/>
      <input type="submit" value="search" />
    </form>

      <select value={type} onChange={e => setType(e.target.value)}>
      <option>all</option>
        <option>normal</option>
        <option>fighting</option>
        <option>flying</option>
        <option>poison</option>
        <option>ground</option>
        <option>rock</option>
        <option>bug</option>
        <option>ghost</option>
        <option>steel</option>
        <option>fire</option>
        <option>water</option>
        <option>grass</option>
        <option>electric</option>
        <option>psychic</option>
        <option>ice</option>
        <option>dragon</option>
        <option>dark</option>
        <option>fairy</option>
        <option>unknown</option>
        <option>shadow</option>
        
      </select>

      <div id="poke-list">
        {type === "all" ? pokemonList : typeList}
      </div>
    </div>
  );
}