import React, { lazy, useContext, useEffect, Suspense } from 'react'
import Navbar from './Components/Navbar'
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from 'react-router-dom'
import { AuthContext, AuthProvider } from './auth.jsx'

const Home = lazy(() => import('./Pages/home/Home'))
const FuelForm = lazy(() => import('./Pages/fuelForm/FuelForm'))
const Login = lazy(() => import('./Pages/login/Login'))
const Profile = lazy(() => import('./Pages/profile/Profile'))
const History = lazy(() => import('./Pages/history/History'))

const username = localStorage.getItem('username')

const ProtectedRoute = ({ children }) => {
  const { authState } = useContext(AuthContext)
  const navigate = useNavigate()

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!username) {
      navigate('/login')
    }
  }, [navigate])

  return username ? children : null
}

function App() {
  return (
    <Router className="app">
      <AuthProvider>
        <Navbar/>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fuelform" element={<ProtectedRoute><FuelForm /></ProtectedRoute>}/>
            <Route path="/login" element={username? <Navigate to="/" replace /> : <Login />}/>
            <Route path="/register" element={username ? <Navigate to="/" replace /> : <Login />}/>
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
            <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>}/>
          </Routes>
        </Suspense>
      </AuthProvider>
  </Router>
  )
}

export default App
