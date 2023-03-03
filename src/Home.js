import {React, useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';




export function Home(){
//sets states
    const [pokemon, setPokemon] = useState({});
    const [search, setSearch] = useState("");
    const [type, setType] = useState("all")
    const [pokemonTypes, setPokemonTypes] = useState({})
    const [generation, setGeneration] = useState("all")
    const [generationName, setGenerationName] = useState({})

    

    const navigate = useNavigate();

//calls the API to get a full list of pokemon
    useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
    .then(i => i.json())
    .then(i =>setPokemon(i))
    .catch(error => console.log(error.message))
  }, [])

//calls the API if a type of pokemon is selected 
  useEffect(() => {
    if(type !== "all"){
    fetch(`https://pokeapi.co/api/v2/type/${type}`)
    .then(j => j.json())
    .then(j =>setPokemonTypes(j))
    .catch(error => console.log(error.message))
}}, [type])

//calls the API if a generation is selected
  useEffect(() => {
    if(generation !== "all"){
    fetch(`https://pokeapi.co/api/v2/generation/${generation}`)
    .then(k => k.json())
    .then(k =>setGenerationName(k))
    .catch(error => console.log(error.message))
}}, [generation])

//maps through the results of the pokemon API being called and lists each pokemon
    const pokemonList = pokemon.results?.map(i => <div>
      <Link to={`/pokemon/${i.name}`}><h3>{i.name}</h3></Link>
    </div>)

//maps through the results of the pokemonTypes if a type is selected
    const typeList = pokemonTypes.pokemon?.map(j => <div>
      <Link to={`/pokemon/${j.pokemon.name}`}><h3>{j.pokemon.name}</h3></Link>
    </div>)

//maps through the resuls of generation if a generation is selected
    const generationList = generationName.pokemon_species?.map(k => <div>
      <Link to={`/pokemon/${k.name}`}><h3>{k.name}</h3></Link>
    </div>)


//Handles sumbission of the search form
    const handleSubmit = event => {
      event.preventDefault();
      navigate(`/pokemon/${search}`)
      
    }
    

//JSX for dropdown filter when Type is selected
    const selectByType = (
      <select value={type} onChange={e => setType( e.target.value)}>
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
    )

  //JSX for when generation is selected
    const generationNames =(
      <select value={generation} onChange={e => setGeneration(e.target.value)}>
        <option>all</option>
        <option>generation-i</option>
        <option>generation-ii</option>
        <option>generation-iii</option>
        <option>generation-iv</option>
        <option>generation-v</option>
        <option>generation-vi</option>
        <option>generation-vii</option>
        <option>generation-viii</option>
        <option>generation-ix</option>
      </select>
    )


//Handles switching between the different filter types
    const typeChoice = document.getElementById('type-choice')
    const generationChoice = document.getElementById('generation-choice')
    const [filter, setFilter] = useState("type")

    const handleChange = () => {
     if(typeChoice.checked){
      setFilter("type")
     }
     else if(generationChoice.checked){
      setFilter("generation")
     }
    } 

  

  return (
    <div className="App">
      <h1>Pokedex</h1>

    <form onSubmit={handleSubmit}>
      <input type="text" value={search} onChange ={e => setSearch(e.target.value.toLowerCase())}/>
      <input type="submit" value="search" />
    </form>

    <div onChange={handleChange}>
      <p>Filter by:</p>
      <label htmlFor="type">Type</label>
      <input type="radio" id="type-choice" value="type" name="filterBy" defaultChecked></input>
      <span> or </span>
      <label htmlFor="generation">Generation</label>
      <input type="radio" id="generation-choice" value="generation" name="filterBy"></input>
    </div>

    <div id="filter-choice">
     {filter === "type" ? selectByType : generationNames}

    </div>
      
    
      <div id="poke-list">
        {filter === "type" && type === "all" ? pokemonList : filter === "type" && type !== "all" ? typeList : filter === "generation" && generation === "all" ? pokemonList : filter === "generation" && generation !== "all" ? generationList : typeList} 
        
      </div>
    </div>
  );

}