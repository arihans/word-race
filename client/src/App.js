import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

import Register from './components/Register';
import Login from './components/Login';
import Game from './components/game/Game';
import GameOver from './components/GameOver'

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Game />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/gameover" element={<GameOver />} />
            </Routes>
        </Router>
    );
}

export default App;
