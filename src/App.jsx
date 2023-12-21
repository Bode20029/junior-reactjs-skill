import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import FavPoke from './components/FavPoke';

// components



function App() {
  
  const [poke, setPoke] = useState("")
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("")
  const [number, setNumber] = useState(1)
  const [fav,SetFav] = useState([])
  
  useEffect( () => {
    
    let abortController = new AbortController();

    const loadPoke = async () => {
      try  {

        setLoading(true);
        let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${number}`, {
          signal: abortController.signal
        });

        setPoke(response.data);
        setError("");
      } catch (error) {
        setError("Something went wrong",error)
      } finally {
        setLoading(false);
      }
    }

    loadPoke();

    
    return () => abortController.abort()
  },[number])
  console.log(poke)
  const prevPoke = () => {
    setNumber(() => number- 1 )
  }
  const nextPoke = () => {
    setNumber(() => number+ 1 )
  }

  const addFav = () => {
    SetFav((oldState) => [...oldState, poke])
  }
  console.log("Pokemon ID", number)

  return (
    <div>
      <h1>{poke?.name} </h1>
      <button onClick={addFav}>Add to favorite</button>
      <br/>
      <img src={poke?.sprites?.other?.home?.front_default} alt={poke?.name} />
      <ul>
        {poke?.abilities?.map((abil, idx) => (
          <li key={idx}>{abil.ability.name}</li>
        ))}
      </ul>
      <button onClick={prevPoke}>Previous</button>
      <button onClick={nextPoke}>Next</button>
      <div>
        <FavPoke fav={fav} />
      </div>
    </div>
  )
}

export default App
