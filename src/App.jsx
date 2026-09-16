import {useState}  from 'react'
import ApiDemo from './ApiDemo.jsx'

import './App.css'

function App() {
   const [count, setCount] = useState(0)

  return (
    <div className="app">
      <h1>My React App</h1>
      <p>Edit <code>src/App.jsx</code> and save to reload.</p>
      <button onClick={() => setCount((c) => c + 1)}>
        Count is {count}
      </button>
       <ApiDemo />
    </div>

  )
}

export default App
