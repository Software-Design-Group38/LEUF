import React, { lazy, useContext, useEffect, Suspense } from 'react'
import Navbar from './Components/Navbar'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import { AuthContext, AuthProvider } from './auth.jsx'

const Home = lazy(() => import('./Pages/home/Home'))
const FuelForm = lazy(() => import('./Pages/fuelForm/FuelForm'))
const Login = lazy(() => import('./Pages/login/Login'))
const Profile = lazy(() => import('./Pages/profile/Profile'))
const History = lazy(() => import('./Pages/history/History'))

const ProtectedRoute = ({ children }) => {
  const { authState } = useContext(AuthContext)
  const navigate = useNavigate()
  const username = localStorage.getItem('username')

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!username) {
      navigate('/login')
    }
  }, [username, navigate])

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
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Login />}/>
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
            <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>}/>
            {/*
            <Route path="/" element={<Home />} />
            <Route path="/fuelform" element={<FuelForm />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Login />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/history" element={<History />}/>
            */}
          </Routes>
        </Suspense>
      </AuthProvider>
  </Router>
  )
}

export default App
