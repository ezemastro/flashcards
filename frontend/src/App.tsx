import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Nav from './components/Nav'
import Register from './page/Register'
import Login from './page/Login'
import Search from './page/Search'
import Cards from './page/Cards'
import Decks from './page/Decks'

function App () {
  const Layout = () => {
    return (
      <>
        <Nav />
        <Outlet />
      </>
    )
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/register',
          element: <Register />
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/search',
          element: <Search />
        },
        {
          path: '/cards',
          element: <Cards />
        },
        {
          path: '/decks',
          element: <Decks />
        },
        {
          path: '*',
          element: <h1>404</h1>
        }
      ]
    }
  ])
  return (
    <RouterProvider router={router} />
  )
}

export default App
