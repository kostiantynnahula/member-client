import { Dashboard } from '../components/Pages/Dashboard/Dashboard';
import { createBrowserRouter } from 'react-router-dom';
import { Error } from '../components/Layout/Error/Error';

export const privateRoutes = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard/>,
    errorElement: <Error/> 
  } 
]);