import { RouteObject } from 'react-router-dom'

import { MenuPage } from '../menu/MenuPage'

export const privateRoutes: RouteObject[] = [{ path: '/menu', element: <MenuPage /> }]
