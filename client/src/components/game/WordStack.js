import { wordsList } from 'random-words';
import React, { useState, useEffect } from 'react';
import '../../styles/WordStack.css';

const WordStack = (props) => {
    const [style, setStyle] = useState({});
    const [doesBlink, setDoesBlink] = useState(false);

    useEffect(() => {
        if (props.isCorrect) {
            if (props.isCompleted) {
                setStyle({ border: 'solid green', color: 'green' });
            }
        } else {
            setStyle({ border: 'solid red', color: 'red' });
        }

        // Remove color effect after some time
        const setStyleTimeout = setTimeout(() => {
            setStyle({});
            props.setIsCorrect(true);
        }, props.isCorrectTimeout-100);

        return () => clearTimeout(setStyleTimeout);
    }, [props.isCorrect, props.isCompleted]);


    useEffect(() => {
        const interval = setInterval(() => {
            setDoesBlink(!doesBlink);
        }, 1000);
        return () => clearInterval(interval);
    }, [doesBlink]);


    return (
        <div className='wordstack'>
            {props.wordList.map((word, wordIndex) => {
                return (
                    <div className='word' key={wordIndex} style={wordIndex === 0 ? style : {}}>
                        {word.toString().split('').map((letter, letterIndex) => {
                            return (
                                <span key={letterIndex} style={{
                                    color: wordIndex === 0
                                        ? props.text[letterIndex] === letter ? 'green'
                                            : props.isCorrect ? '#1E1F1F' : 'red'
                                        : wordIndex + 1 === props.maxStackSize && doesBlink ? 'red' : '#1E1F1F',
                                }}
                                >
                                    {letter}
                                </span>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    );
};

export default WordStack;

