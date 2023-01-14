import { useQuery } from '@apollo/client';
import { privateRoutes } from './routes/private';
import { publicRoutes } from './routes/public';
import { RouterProvider } from 'react-router-dom';
import { LocalStorageService } from './utils/services/LocalStorage';
import { GET_AUTH_PROFILE } from './queries/auth';

export const App = () => {

  const { data, loading } = useQuery(GET_AUTH_PROFILE);

  const isAuthorized = LocalStorageService.getAuth();

  const router = isAuthorized ? privateRoutes : publicRoutes;

  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}
