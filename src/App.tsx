import { createContext, useState } from 'react';
import { privateRoutes } from './routes/private';
import { publicRoutes } from './routes/public';
import { RouterProvider } from 'react-router-dom';
import { LocalStorageService } from './utils/services/LocalStorage';
import { AuthDetails } from './utils/models/auth';

export const AuthContext = createContext({
  auth: LocalStorageService.getAuth() || null,
  setAuth: (auth: AuthDetails) => {}
});

export const App = () => {
  const [auth, setAuth] = useState<AuthDetails | null>(LocalStorageService.getAuth());

  const router = auth ? privateRoutes : publicRoutes;

  return (
    <div className="App">
      <AuthContext.Provider value={{ auth, setAuth }}>
        <RouterProvider router={router}/>
      </AuthContext.Provider>
    </div>
  );
}
