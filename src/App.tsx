import { privateRoutes } from './routes/private';
import { publicRoutes } from './routes/public';
import { RouterProvider } from 'react-router-dom';

export const App = () => {

  const isAuthorized = true;

  const router = isAuthorized ? privateRoutes : publicRoutes;

  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}
