import React from 'react';
import './App.css';
import { NavLink, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Home from './components/Home';
import Articles from './components/Articles';
import SummonerInfo from './components/SummonerInfo';

function App() {
  return (
    <div className="App">
      <nav className="navbar">
          <h1 className='navbar-logo'>League It Out</h1>
          <NavLink to="/" className='navbar-item'> Home </NavLink>
          <NavLink to="/articles" className='navbar-item'> Articles </NavLink>
      </nav>    

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/summonerInfo" element={<SummonerInfo />} />
        <Route path="/articles" element={<Articles />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
