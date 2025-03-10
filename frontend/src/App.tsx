import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Nav from './components/Nav'

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
      children: []
    }
  ])
  return (
    <RouterProvider router={router} />
  )
}

export default App
