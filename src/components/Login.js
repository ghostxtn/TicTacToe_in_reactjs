import React, { useState } from 'react';

function Login({ onLogin, loginError, onPhoneVerification }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const validateUsername = (username) => {
        if (username.length < 1 || username.length > 10) {
            setUsernameError('Username must be between 1 and 10 characters');
        } else {
            setUsernameError('');
        }
    };

    const validatePassword = (password) => {
        if (password.length < 3 || password.length > 15) {
            setPasswordError('Password must be between 3 and 15 characters');
        } else {
            setPasswordError('');
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitted(true);
        validateUsername(username);
        validatePassword(password);
        if (username.length >= 1 && username.length <= 10 && password.length >= 3 && password.length <= 15) {
            onLogin(username, password);
        }
    };

    const handlePhoneVerification = () => {
        if (onPhoneVerification) {
            onPhoneVerification();
        }
    };

    return (
        <>
            <h1 className="title">Login</h1>
            <div className="login-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onBlur={() => validateUsername(username)}
                    />
                    {submitted && usernameError && <div className="error">{usernameError}</div>}
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={() => validatePassword(password)}
                    />
                    {submitted && passwordError && <div className="error">{passwordError}</div>}
                    {submitted && loginError && <div className="error">{loginError}</div>}
                    <button type="submit">Login</button>
                    <button type="button" onClick={handlePhoneVerification}>Phone Verification</button>
                </form>
            </div>
        </>
    );
}

export default Login;
