import React, { useState, useEffect } from 'react';
import './WordStack.css'

const WordStack = (props) => {
    const [style, setStyle] = useState({});

    useEffect(() => {
        if (props.isCorrect) {
            if (props.isCompleted) {
                setStyle({ border: 'solid green', color: 'green' });
            }
        } else {
            setStyle({ border: 'solid red', color: 'red' });
        }
        const setStyleTimeout = setTimeout(() => {
            setStyle({});
            props.setIsCorrect(true);
        }, props.isCorrectTimeout - 100);

        return () => clearTimeout(setStyleTimeout);
    }, [props.isCorrect, props.isCompleted]);

    return (
        <div className='wordstack'>
            {props.wordList.map((word, wordIndex) => {
                return (
                    <div className='word' key={wordIndex} style={wordIndex === 0 ? style : {}}>
                        {word.toString().split('').map((letter, letterIndex) => {
                            return (
                                <span key={letterIndex} style={
                                    props.text[letterIndex] === letter && wordIndex === 0
                                        ? {color: 'green'}
                                        : props.isCorrect ? {color: '#1E1F1F'}
                                            : wordIndex === 0 ? {color: 'red'} : {}
                                }
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

