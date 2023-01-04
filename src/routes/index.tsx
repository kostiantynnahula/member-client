import { Error } from '../components/Layout/Error/Error';
import { Dashboard } from '../components/Pages/Dashboard/Dashboard';
import { Login } from '../components/Pages/Login/Login';
import { createBrowserRouter } from 'react-router-dom';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <Login/>,
    errorElement: <Error/>
  },
  {
    path: 'dashboard',
    element: <Dashboard/>
  }
])