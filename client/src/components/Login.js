import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../styles/Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [showError, setShowError] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = () => {
        axios
            .post(`${process.env.REACT_APP_SERVER_BASE_URL}/login`, {
                username: username,
                password: password,
            })
            .then((response) => {
                if (response.data.error) {
                    setShowError(true)
                    setErrorMsg(response.data.error);
                } else {
                    navigate('/game');
                }
            })
            .catch((error) => {
                setShowError(true)
                setErrorMsg('An error occurred');
                console.error(error);
            });
    };

    useEffect(() => {
        if (showError) {
            setTimeout(() =>
                setShowError(false)
            , 10000);
        } else {
            setShowError(false);
        }

        return () => clearTimeout(setTimeout);
    }, [showError]);

    return (
        <div className='Login'>
            <form onSubmit={handleSubmit}>
                <div className='input-container'>
                    <input type='text' value={username} placeholder='User Name'
                        onChange={(event) => setUsername(event.target.value)} />
                </div>
                <div className='input-container'>
                    <input type='password' value={password} placeholder='Password'
                        onChange={(event) => setUsername(event.target.value)} />
                </div>
                <div className='button-container'>
                    <button type='submit'>Submit</button>
                    <button type='button' className='register-button' onClick={() => navigate('/register')}>
                        New user? Click here to register
                    </button>
                </div>
            </form>
            {showError && (
                <div className='error-message'>
                    {errorMsg}
                </div>
            )}
        </div>
    );
}

export default Login;
