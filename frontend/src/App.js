import React, { lazy } from 'react'
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('./Pages/home/Home'));
const FuelForm = lazy(() => import('./Pages/fuelForm/FuelForm'));
const CreateAccount = lazy(() => import('./Pages/createAcc/CreateAcc'));

function App() {
  return (
    <Router className="app">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fuelform" element={<FuelForm />}/>
        <Route path="/createacc" element={<CreateAccount />}/>
      </Routes>
  </Router>
  );
}

export default App;
