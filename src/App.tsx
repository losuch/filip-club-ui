import CssBaseline from '@mui/material/CssBaseline';
import React, { Suspense } from 'react';
import { TemplateContextProvider } from './features/Global/templateretrive';
import NotificationBanner from './components/NotificationBanner/index';
import { NotificationProvider } from './components/NotificationBanner/context';
import { AuthContextProvider } from './features/Auth/authContext';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/index';

const Login = React.lazy(() => import('./features/Auth/Login'));
const Home = React.lazy(() => import('./features/Home'));
const Accounts = React.lazy(() => import('./features/Services/accounts'));
const NotFound = React.lazy(() => import('./features/NotFound'));

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Login />,
    },
    {
      path: '/products',
      element: (
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      ),
    },
    {
      path: '/admin/accounts',
      element: (
        <PrivateRoute>
          <Accounts />
        </PrivateRoute>
      ),
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ],
  {
    basename: '/filip-club',
  }
);

const App = () => {
  return (
    <div className="App">
      <CssBaseline />
      <Suspense fallback={<div>Loading...</div>}>
        <TemplateContextProvider>
          <NotificationProvider>
            <AuthContextProvider>
              <RouterProvider router={router} />
              <NotificationBanner />
            </AuthContextProvider>
          </NotificationProvider>
        </TemplateContextProvider>
      </Suspense>
    </div>
  );
};

export default App;
