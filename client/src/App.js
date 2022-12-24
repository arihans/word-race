import React, {useState, useEffect} from 'react';
import WordStack from './components/WordStack';
import Keyboard from './components/Keyboard';

import './App.css';

const App = () => {
    return (
        <div className='App'>
            <WordStack />
            <Keyboard />
        </div>
    );
};

export default App;
