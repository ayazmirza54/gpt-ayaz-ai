import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GPTAyazWebsite from './Components/gptayaz'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <GPTAyazWebsite />
    </>
  )
}

export default App
