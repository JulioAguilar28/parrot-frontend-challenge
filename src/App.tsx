import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Progress from '@mui/joy/CircularProgress'

import { privateRoutes, publicRoutes } from './router/AppRouter'
import * as AuthService from './auth/service/auth'
import * as StorageService from './services/LocalStorage'
import { useCurrentUser } from './auth/store/useCurrentUser'
import './App.css'

function App() {
  const { user, setUser } = useCurrentUser()
  const [loading, setLoading] = useState<boolean>(false)
  const routes = user.isLoggedIn ? privateRoutes : publicRoutes

  useEffect(() => {
    setLoading(true)

    const handleVerifyCurrentUser = async () => {
      const user = await AuthService.validateCurrentUser()
      setUser(user)
    }

    handleVerifyCurrentUser()
      .then(() => {
        setLoading(false)
      })
      .catch((reason) => {
        console.error({ reason })
        StorageService.clearAccessAndRefreshTokens()
        setUser({ isLoggedIn: false })
      })
      .finally(() => {
        setLoading(false)
      })
  }, [setLoading, setUser])

  // Avoid to show login page while verify current user tokens
  if (loading) {
    return (
      <div className="min-h-dvh grid place-content-center">
        <Progress size="lg" color="danger" />
      </div>
    )
  }

  return (
    <BrowserRouter basename="/parrot">
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  )
}

export default App
