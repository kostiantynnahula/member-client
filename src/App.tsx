import { privateRoutes } from './routes/private';
import { publicRoutes } from './routes/public';
import { RouterProvider } from 'react-router-dom';

export const App = () => {

  const routes = publicRoutes;
  // const routes = privateRoutes;

  return (
    <div className="App">
      <RouterProvider router={routes}/>
    </div>
  );
}
