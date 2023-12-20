import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  
  const [poke, setPoke] = useState("")
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("")
  
  useEffect( () => {
    
    let abortController = new AbortController();

    const loadPoke = async () => {
      try  {

        setLoading(true);
        let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/1`, {
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
  },[])
  console.log(poke)
  return (
    <>
      
    </>
  )
}

export default App
