import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Registration = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('')
    const [showError, setShowError] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = () => {
        if (password !== confirmPassword) {
            setErrorMsg('Passwords do not match')
            setShowError(true);
        } else {
            setShowError(false);
            axios
                .post(`${process.env.REACT_APP_SERVER_BASE_URL}/register`, {
                    username: username,
                    password: password,
                })
                .then((response) => {
                    if (response.data.error) {
                        setErrorMsg(response.data.error);
                    } else {
                        navigate('/game');
                        // TODO: Handle successful registration
                    }
                })
                .catch((error) => {
                    setErrorMsg('An error occurred');
                    console.error(error);
                });
        }
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
            <label>
                Confirm Password:
                <input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
            </label>
            <br />
            <button type="submit">Submit</button>
            <br />

            <button type="button" onClick={() => navigate('/login')}>
                Already have an account? Login
            </button>

            {showError && (
                <div className="error-message">
                    {errorMsg}
                </div>
            )}
        </form>
    );
}

export default Registration;
