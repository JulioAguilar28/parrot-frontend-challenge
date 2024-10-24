import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { LoginPage } from './auth/LoginPage'
import { privateRoutes } from './router/AppRouter'
import './App.css'

function App() {
  return (
    <BrowserRouter basename="/parrot">
      <Routes>
        {/* Only visible when user is logged in */}
        {privateRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}

        <Route path="/login" Component={LoginPage} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
