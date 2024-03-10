import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import RoutesIndex from './routes/Index'
import { useNavigate } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0);

  const navigate = useNavigate();


  useEffect(()=>{

    //check token
    // if(localStorage.getItem('token'))
    // {
    //   navigate('/dashboard')
    // }

  },[])

  return (
    <>
      <RoutesIndex/>
    </>
  )
}

export default App
