import { useState } from 'react'
import React, {Fragment} from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Fragment>
      <h1>Counter</h1>
      <h2>{count}</h2>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </Fragment>
  )
}

export default App
