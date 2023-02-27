
import './App.css';
import {Routes, Route} from 'react-router-dom'
import { Home } from './Home'
import { Pokemon } from './Pokemon'


function App() {
  

  return (
    <div className="App">
      <Routes>
        <Route path ="/" element={ <Home /> }/>
        <Route path="/pokemon/:name" element={ <Pokemon/> }  />
      </Routes>
    </div>
  );
  
}

export default App;
