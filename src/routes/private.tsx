import { createBrowserRouter } from 'react-router-dom';
import { Error } from '../components/Layout/Error/Error';
import { Dashboard } from '../components/Pages/Dashboard/Dashboard';
import { Folder } from './../components/Pages/Folder/Folder';
import { Profile } from './../components/Pages/Profile/Profile';

export const privateRoutes = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard/>,
    errorElement: <Error/> 
  }, 
  {
    path: '/folder/:id',
    element: <Folder/>
  }, 
  {
    path: 'profile',
    element: <Profile/>
  } 
]);