import { createBrowserRouter } from 'react-router-dom';
import { Error } from 'components/Layout/Error/Error';
import { Dashboard } from 'components/Pages/Dashboard/Dashboard';
import { Folders } from 'components/Pages/Folders/Folders';
import { Profile } from 'components/Pages/Profile/Profile';
import { Root } from 'components/Layout/Root/Root';

export const privateRoutes = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    errorElement: <Error/>,
    children: [
      {
        path: '/',
        element: <Dashboard/>,
        children: [
          {
            path: '/',
            element: <Folders/>
          },
          {
            path: 'folder/:id',
            element: <Folders/>
          }
        ]
      },
      {
        path: 'profile',
        element: <Profile/>
      }
    ] 
  } 
]);