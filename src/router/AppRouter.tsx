import { RouteObject, Navigate } from 'react-router-dom'

import { MenuPage } from '../menu/MenuPage'
import { LoginPage } from '../auth/LoginPage'

export const privateRoutes: RouteObject[] = [
  { path: '/stores', element: <MenuPage /> },
  { path: '/*', element: <Navigate replace to="/menu" /> }
]

export const publicRoutes: RouteObject[] = [
  { path: '/login', element: <LoginPage /> },
  { path: '/*', element: <Navigate replace to="/login" /> }
]
