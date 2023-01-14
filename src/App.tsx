import { privateRoutes } from './routes/private';
import { publicRoutes } from './routes/public';
import { RouterProvider } from 'react-router-dom';
import { LocalStorageService } from './utils/services/LocalStorage';

export const App = () => {

  const isAuthorized = LocalStorageService.getAuth();

  const router = isAuthorized ? privateRoutes : publicRoutes;

  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}
