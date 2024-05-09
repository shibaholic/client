import { useEffect, useState } from 'react'
import reactLogo from '../assets/react.svg'

import "./ElementTest.css"

const ElementTest:React.FunctionComponent = () => {
  const [count, setCount] = useState(0)

  return (
    <>

      <h1>Test page</h1>
      <h2>This is h2</h2>
      <h3>This is h3</h3>
      <h4>This is h4</h4>

      <p>This is text. This is text. This is text. This is text. This is text. This is text. This is text. This is text. This is text. This is text. This is text. This is text. </p>

      <a>This is a link.</a>

      <button>Button</button>

      <img src={reactLogo} className="logo2 react" alt="React logo" />

      {/* <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src ElementTest
        .tsx</code> and save to test HMR
        </p>
      </div> */}
      
    </>
  )
}

export default ElementTest