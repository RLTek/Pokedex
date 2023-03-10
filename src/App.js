
import './App.css';
import {Routes, Route} from 'react-router-dom'
import { Home } from './Home'
import { Pokemon } from './Pokemon'
import { Move } from './Move'
import { Ability } from './Ability'


function App() {
  

  return (
    <div className="App">
      <Routes>
        <Route path ="/" element={ <Home /> }/>
        <Route path="/pokemon/:name" element={ <Pokemon/> }  />
        <Route path="/move/:name" element={ <Move />}></Route>
        <Route path="/ability/:ability" element={ <Ability /> }></Route>
      </Routes>
    </div>
  );
  
}

export default App;
