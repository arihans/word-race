import React, {useState, useEffect, useRef} from 'react';
import * as randomWords from 'random-words';

import Progress from './components/Progress';
import WordStack from './components/WordStack';
import Keyboard from './components/Keyboard';

import './App.css';

const App = () => {
    const [text, setText] = useState('');
    const [wordList, setWordList] = useState([]);
    const [isCorrect, setIsCorrect] = useState(true);
    const [isCompleted, setIsCompleted] = useState(false);
    const [letterIdx, setLetterIdx] = useState(0);
    const [score, setScore] = useState(0)
    const isCorrectTimeout = useRef(500)


    const onWordMatch = () => {
        setScore(score + wordList[0].length);

        wordList.shift();
        setWordList([...wordList, randomWords({exactly: 1, maxLength: 10, formatter: (word)=> word.toUpperCase()})]);

        setText('');
        setLetterIdx(0);
        setIsCompleted(false);

        // Signal Correct
        // Update words -> animate dissapearing word
        // console.log(score);
    }


    // --------- useEffect hooks ------------------------
    useEffect(() => {
        const word = String(wordList[0]);
        const tempText = String(text);
        let wordMatchTimeout = null;

        if (text == '') return;
        console.log(`pressed text = ${tempText}, word = ${word}, letterIdx = ${letterIdx}`);

        if (word[letterIdx].toUpperCase() === tempText.slice(-1).toUpperCase()) {
            setIsCorrect(true);
            setLetterIdx(letterIdx+1);

            if (letterIdx === word.length-1) {
                setIsCompleted(true);

                wordMatchTimeout = setTimeout(() => {
                    onWordMatch();
                }, isCorrectTimeout.current)
            }
        } else {
            setIsCorrect(false);
            setText('');
            setLetterIdx(0);
        }

        return () => clearTimeout(wordMatchTimeout);
    }, [text]);


    useEffect(() => {
        // Initialize wordList
        const tempWordList = randomWords({exactly: 8, maxLength: 10, formatter: (word)=> word.toUpperCase()});
        setWordList(tempWordList);

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
                setIsCorrect={setIsCorrect}/>
            <Keyboard text={text} setText={setText} />
        </div>
    );
};

export default App;
