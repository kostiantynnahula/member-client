import { createBrowserRouter } from 'react-router-dom';
import { Error } from '../components/Layout/Error/Error';
import { Dashboard } from '../components/Pages/Dashboard/Dashboard';
import { Folder } from './../components/Pages/Folder/Folder';
import { Profile } from './../components/Pages/Profile/Profile';
import { Root } from './../components/Layout/Root/Root';

export const privateRoutes = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    errorElement: <Error/>,
    children: [
      {
        path: '/',
        element: <Dashboard/>
      },
      {
        path: 'folder/:id',
        element: <Folder/>
      }, 
      {
        path: 'profile',
        element: <Profile/>
      }
    ] 
  } 
]);