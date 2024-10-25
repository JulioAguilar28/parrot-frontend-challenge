import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Progress from '@mui/joy/CircularProgress'

import { privateRoutes, publicRoutes } from './router/AppRouter'
import * as AuthService from './auth/service/auth'
import * as StorageService from './services/LocalStorage'
import { useCurrentUser } from './auth/store/useCurrentUser'
import './App.css'

function App() {
  const { isLoggedIn, setIsLoggedIn } = useCurrentUser()
  const [loading, setLoading] = useState<boolean>(false)
  const routes = isLoggedIn ? privateRoutes : publicRoutes

  useEffect(() => {
    setLoading(true)

    const handleVerifyCurrentUser = async () => {
      const isLoggedIn = await AuthService.validateCurrentUser()
      setIsLoggedIn(isLoggedIn)
    }

    handleVerifyCurrentUser()
      .then(() => {
        setLoading(false)
      })
      .catch((reason) => {
        console.error({ reason })
        StorageService.clearAccessAndRefreshTokens()
        setIsLoggedIn(false)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [setIsLoggedIn, setLoading])

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
