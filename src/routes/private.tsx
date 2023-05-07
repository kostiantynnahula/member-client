import { createBrowserRouter } from 'react-router-dom';
import { Error } from 'components/Layout/Error/Error';
import { Dashboard } from 'components/Pages/Dashboard/Dashboard';
import { Folders } from 'components/Pages/Folders/Folders';
import { Profile } from 'components/Pages/Profile/Profile';
import { Root } from 'components/Layout/Root/Root';
import { OrganizationEdit } from 'components/Pages/Organization/OrganizationEdit';
import { Invite } from 'components/Pages/Organization/Invite';

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
          },
          {
            path: 'organization/:orgId',
            element: <Folders/>,
          },
          {
            path: 'organization/:orgId/folder/:id',
            element: <Folders/>,
          }
        ]
      },
      {
        path: 'profile',
        element: <Profile/>
      },
      {
        path: 'organization/:orgId/edit',
        element: <OrganizationEdit/>,
      },
      {
        path: 'invite/:token',
        element: <Invite/>,
      }
    ] 
  } 
]);