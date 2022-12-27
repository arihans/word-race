import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import * as randomWords from 'random-words';

import Progress from './Progress';
import WordStack from './WordStack';
import Keyboard from './Keyboard';

const Game = () => {
    const socket = io(`${process.env.REACT_APP_SERVER_BASE_URL}`);
    const navigate = useNavigate();

    const [text, setText] = useState('');
    const [wordList, setWordList] = useState([]);
    const [letterIdx, setLetterIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [isCorrect, setIsCorrect] = useState(true);
    const [isCompleted, setIsCompleted] = useState(false);

    const maxStackSize = useRef(8);
    const wordSpawnTimeout = useRef(2000);
    const typingStartTime = useRef(0);
    const isCorrectTimeout = useRef(1000);


    const onWordMatch = () => {
        setScore(score + wordList[0].length);

        wordList.shift();
        setWordList([...wordList, randomWords({ exactly: 1, maxLength: 10, formatter: (word) => word.toUpperCase() })]);

        setText('');
        setLetterIdx(0);
        setIsCompleted(false);
    }


    // --------- useEffect hooks ------------------------

    // Handle typed letters
    useEffect(() => {
        const word = String(wordList[0]);
        const tempText = String(text);
        let wordMatchTimeout = null;

        if (tempText === '') return;
        console.log(`pressed text = ${tempText}, word = ${word}, letterIdx = ${letterIdx}`);

        if (tempText.length === 1) {
            typingStartTime.current = Date.now();
        }

        if (word[letterIdx].toUpperCase() === tempText.slice(-1).toUpperCase()) {
            setIsCorrect(true);
            setLetterIdx(letterIdx + 1);

            if (letterIdx === word.length - 1) {
                setIsCompleted(true);

                onWordMatch();
                // Delay before doing anything after word match so that
                // the matched word can dissapear graciously
                // wordMatchTimeout = setTimeout(() => {
                // }, isCorrectTimeout.current)
            }
        } else {
            setIsCorrect(false);
            setText('');
            setLetterIdx(0);
        }

        return () => clearTimeout(wordMatchTimeout);
    }, [text]);


    // Handle Word stack overflows
    useEffect(() => {
        const wordSpawnInterval = setInterval(() => {
            setWordList([...wordList, randomWords({ exactly: 1, maxLength: 10, formatter: (word) => word.toUpperCase() })]);
        }, wordSpawnTimeout.current);

        if (wordList.length > maxStackSize.current) {
            clearInterval(wordSpawnTimeout);
            navigate('/gameover');
        }
        return () => clearInterval(wordSpawnTimeout);
    }, [wordList]);


    // Handle what to do on word match or wrong input
    useEffect(() => {
        const data = {
            wordLength: String(wordList[0]).length,
            typingTimeElapsed: Date.now() - typingStartTime.current,
            isCorrect: isCorrect
        };
        socket.emit('message', data);
    }, [isCorrect, isCompleted]);


    // Called on page render
    useEffect(() => {
        // Initialize wordList
        const tempWordList = randomWords({ exactly: 1, maxLength: 10, formatter: (word) => word.toUpperCase() });
        setWordList(tempWordList);

        // Detect any keypress on screen
        const keyPressListener = (event) => {
            if ((/[a-zA-Z]/).test(event.key)) {
                setText((prevText) => prevText + event.key.toUpperCase());
            }
        };
        window.addEventListener('keypress', keyPressListener);

        return () => window.removeEventListener('keypress', keyPressListener);
    }, []);
    // --------------------------------------------------


    return (
        <div className='App'>
            <Progress score={score} />
            <WordStack wordList={wordList} text={text} isCorrect={isCorrect}
                isCompleted={isCompleted} isCorrectTimeout={isCorrectTimeout.current}
                setIsCorrect={setIsCorrect} maxStackSize={maxStackSize.current} />
            <Keyboard text={text} setText={setText} />
        </div>
    );
}

export default Game;
