import { useEffect, useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import './Homepage.module.css'

const Homepage:React.FunctionComponent = () => {
  const [count, setCount] = useState(0)

  return (
    <>

      <h1>This is h1</h1>
      <h2>This is h2</h2>
      <h3>This is h3</h3>
      <h4>This is h4</h4>

      <p>This is text. This is text. This is text. This is text. This is text. This is text. This is text. This is text. This is text. This is text. This is text. This is text. </p>

      <a>This is a link.</a>

      <button>Button</button>

      <img src={viteLogo} className="logo" alt="Vite logo" />
      <img src={reactLogo} className="logo react" alt="React logo" />
    </>
  )
}

export default Homepage