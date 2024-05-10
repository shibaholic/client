import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Outlet, RouterProvider, createBrowserRouter, useParams } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Header from './components/Header'
import Footer from './components/Footer'
import ErrorPage from './pages/ErrorPage'
import ElementTest from './pages/ElementTest'
import { ArticlePage } from './pages/ArticlePage'

const Layout = () => {
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout/>,
    errorElement: <ErrorPage />,
    children:
    [
      {
        path: "/",
        element: <Homepage />
      },
      {
        path: "/test",
        element: <ElementTest />
      },
      {
        path: "/error",
        element: <ErrorPage />
      },
      {
        path: "/about",
        element: <ArticlePage articleID="aboutus" newsPanel={true} />
      },
      {
        path: "/news/:id",
        element: <ArticlePage collection="news-articles" newsPanel={false}/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
