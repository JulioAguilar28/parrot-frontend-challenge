import { Route, Routes, Navigate } from 'react-router-dom'

import { StoreLayout } from '../stores/layout/StoreLayout'
import { StoreList } from '../stores/components/StoreList'
import { StoreById } from '../stores/pages/StoreById'
import { LoginPage } from '../auth/LoginPage'

export const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/stores" element={<StoreLayout />}>
        <Route path="" element={<StoreList />} />
        <Route path=":id" element={<StoreById />} />
      </Route>

      <Route path="/*" element={<Navigate replace to="/stores" />} />
    </Routes>
  )
}

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/*" element={<Navigate replace to="/login" />} />
    </Routes>
  )
}
