import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Nav from './components/Nav'
import Register from './page/Register'
import Login from './page/Login'
import Search from './page/Search'
import Cards from './page/Cards'
import Decks from './page/Decks'
import Deck from './page/Deck'
import { ToastContainer } from 'react-toastify'
import { useTheme } from './hook/theme'

function App () {
  const { theme } = useTheme()
  const Layout = () => {
    return (
      <>
        <Nav />
        <Outlet />
        <ToastContainer theme={theme} position='bottom-right' />
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
          path: '/decks/:id',
          element: <Deck />
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
