import React from 'react';
import './App.css';
import { NavLink, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer'
import Home from './components/Home'
import Tweets from './components/Tweets'

function App() {
  return (
    <div className="App">
      <nav className="navbar">
          <h1>League It Out</h1> 
          <NavLink to="/"> Home </NavLink>
          <NavLink to="/tweets"> Tweets </NavLink>
      </nav>    

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tweets" element={<Tweets />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
