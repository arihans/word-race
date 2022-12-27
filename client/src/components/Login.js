import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('')
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
                    // TODO: Handle successful registration
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
            setTimeout(() => {
                setShowError(false);
            }, 3000);
        }
    }, [showError]);

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
            </label>
            <br />
            <label>
                Password:
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </label>
            <br />
            <button type="submit">Submit</button>
            <br />
            <button type="button" onClick={() => navigate('/register')}>
                New user? Click here to register
            </button>

            {showError && (
                <div className="error-message">
                    {errorMsg}
                </div>
            )}
        </form>
    );
}

export default Login;
