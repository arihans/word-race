import React from 'react';
import './WordStack.css'

const WordStack = () => {
    const words = ['hello', 'adfdsf', 'somehting', 'sljwearw', 'iowefwear', 'asfdnewfweaf', 'awerjwelkrj'];
    return (
        <div className='wordstack'>
            { words.map((word, index) =>
                <div className='word' key={index}>{`${word}`}</div>
            )}
        </div>
    );
};

export default WordStack;
