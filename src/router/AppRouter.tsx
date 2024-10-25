import { RouteObject, Navigate } from 'react-router-dom'

import { StoresPage } from '../stores/StoresPage'
import { StoreById } from '../stores/pages/StoreById'
import { LoginPage } from '../auth/LoginPage'

export const privateRoutes: RouteObject[] = [
  {
    path: '/stores',
    element: <StoresPage />
  },
  { path: '/stores/:id', element: <StoreById /> },
  { path: '/*', element: <Navigate replace to="/stores" /> }
]

export const publicRoutes: RouteObject[] = [
  { path: '/login', element: <LoginPage /> },
  { path: '/*', element: <Navigate replace to="/login" /> }
]
