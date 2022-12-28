import { lazy } from 'react'

// project import
import Loadable from '@/components/Loadable'
import MinimalLayout from '@/layout/MinimalLayout'

import Login from '@/pages/users/Login'
import Logout from '@/pages/users/Logout'
import Register from '@/pages/users/Register'

// render - login
// const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));
// const AuthRegister = Loadable(lazy(() => import('pages/authentication/Register')));

const LoginRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: 'login',
      element: <Login />
    },
    {
      path: 'register',
      element: <Register />
    },
    {
      path: 'logout',
      element: <Logout />
    }
  ]
}

export default LoginRoutes
