import React, { lazy } from 'react'
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('./Pages/Home'));
const FuelForm = lazy(() => import('./Pages/fuelForm/FuelForm'));

function App() {
  return (
    <Router className="app">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fuelform" element={<FuelForm />}/>
      </Routes>
  </Router>
  );
}

export default App;
