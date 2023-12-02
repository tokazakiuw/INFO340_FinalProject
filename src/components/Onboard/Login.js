import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {signInWithEmailAndPassword} from 'firebase/auth';

function Login({auth}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (event) => {
      event.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .catch(() => {
            alert("Invalid email or password.");
        })
    };

    return (
        <div className="splash-body">
            <main className="splash-main">
                <div className="splash-container">
                    <h1 className="text-outside">Good To See You Again!</h1>
                    <div className="login-splash splash-box">
                        <div className="splash-left-container">
                            <Link to="/">
                                <img aria-label="home button" className="splash-logo" src="./img/favicon.svg" alt="Card Marketplace Logo" />
                            </Link>
                        </div>
                        <div className="splash-right-container">
                            <h1 className="text-inside">Good To See You Again!</h1>
                            <form action="#" className="form" onSubmit={handleLogin}>
                                <div className="fields">
                                    <div className="input-container">
                                        <label htmlFor="email">Email:</label>
                                        <input className="splash-input" type="email" id="email" name="email" placeholder="email" required value={email} onChange={e => setEmail(e.target.value)} /><br />
                                    </div>
                                    <div className="input-container">
                                        <label htmlFor="password">Password:</label>
                                        <input className="splash-input" type="password" id="password" name="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} /><br />
                                    </div>
                                </div>
                                <button type="submit" className="submit splash-button">Log In!</button>
                            </form>
                            <p>Don't have an account? <Link to="/signup" className="splash-link">Sign up!</Link></p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Login;