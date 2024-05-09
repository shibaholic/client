import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Homepage from './pages/Homepage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />
  },
  {
    path: "/about",
    element: <div>about</div>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
