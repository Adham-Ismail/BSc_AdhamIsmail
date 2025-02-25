import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {

  const fetchDatabase = async () => {
    const response = await fetch('http://localhost:3000/data');
    const data = await response.json();
    setData(data);
  }

  useEffect(()=>{
    fetchDatabase();
  })

  const [count, setCount] = useState(0)
  const [data, setData] = useState(null)

  return (
    <>
      
    </>
  )
}

export default App
