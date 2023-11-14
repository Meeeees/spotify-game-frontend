import React from 'react';
import Login from './Login';
import Home from './Home';
import { Routes, Route } from 'react-router-dom';
import Game from './Game';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </div>
  );
}

export default App;
