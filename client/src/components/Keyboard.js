import React from 'react';
import './Keyboard.css';

const Keyboard = (props) => {
    const keys = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
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
                            <button className='key'
                                key={keyIndex}
                                value={key}
                                onClick={(event) => props.setText(props.text + event.target.value)}
                            >
                                {`${key}`}
                            </button>
                        )}
                </div>
                );
            })}
        </div>
    );
};

export default Keyboard;
