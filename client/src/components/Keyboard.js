import React from 'react';
import './Keyboard.css';

const Keyboard = () => {
    const keys = [
        ['Q', 'U', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
    ];

    return (
        <div className='keyboard-container'>
            {keys.map((keyRow, keyRowIndex) => {
                const i = ++keyRowIndex;
                return (
                    <div className={`keyboard-row-${i}`} key={i}>
                        { keyRow.map((key, keyIndex) =>
                            <div className='key' key={keyIndex}>{`${key}`}</div>
                        )}
                </div>
                );
            })}
        </div>
    );
};

export default Keyboard;
