import { Error } from 'components/Layout/Error/Error';
import { Login } from 'components/Pages/Login/Login';
import { createBrowserRouter } from 'react-router-dom';

export const publicRoutes = createBrowserRouter([
  {
    path: '/',
    element: <Login/>,
    errorElement: <Error/>
  },
])