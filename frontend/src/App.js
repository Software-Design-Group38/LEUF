import React, { lazy } from 'react'
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('./Pages/home/Home'));
const FuelForm = lazy(() => import('./Pages/fuelForm/FuelForm'));
const Login = lazy(() => import('./Pages/login/Login'));
const Profile = lazy(() => import('./Pages/profile/Profile'));
const History = lazy(() => import('./Pages/history/History'));

function App() {
  return (
    <Router className="app">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fuelform" element={<FuelForm />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/history" element={<History />}/>
      </Routes>
  </Router>
  );
}

export default App;
