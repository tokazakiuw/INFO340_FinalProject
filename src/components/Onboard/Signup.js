import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getDatabase } from 'firebase/database';
import { ref, set as firebaseSet } from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

function Signup() {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPw, setConfirmPw] = useState("");
    const [tos, setTos] = useState(false);
    const [signedUp, setSign] = useState(false);
    
    const db = getDatabase();
    const auth = getAuth();

    const handleSignup = (event) => {
        event.preventDefault();
        if (event.target.checkValidity()) {
            if (password != confirmPw) {
                alert("Passwords do not match.");
            } else if (lname == "") {
                alert("Please fill out last name.");
            } else {
                createUserWithEmailAndPassword(auth, email, password)
                .then((userCred) => {
                    firebaseSet(ref(db, "Users/" + userCred.user.uid), {
                        "username": username,
                        "fname": fname,
                        "lname": lname,
                        "email": email,
                        "password": password})
                })
                setSign(true);
            }
            
        }
    };

    if (signedUp) {
        return (
            <div className='signup-body splashbody'>
                <h1 className="signup-confirmed" style={{paddingTop: "3rem", textAlign: "center"}}>You're signed in!</h1>
                <p className="signup-confirmed" style={{textAlign: "center"}}><Link to="/main">Click here to go to the main page!</Link> </p>
            </div>
        )
    } else {
         return (
            <div className="signup-body splash-body">
                <main className="splash-main">
                    <div className="splash-container">
                        <h1 className="text-outside">Welcome!</h1>
                        <div className="splash-box">
                            <div className="splash-left-container">
                                <Link to="/">
                                    <img aria-label="home button" className="splash-logo" src="./img/favicon.svg" alt="Card Marketplace Logo" />
                                </Link>
                            </div>
                            <div className="splash-right-container">
                                <h1 className="text-inside">Welcome!</h1>
                                <form action="#" className="form" onSubmit={handleSignup}>
                                    <div className="fields">
                                        <div className="input-container">
                                            <label htmlFor="fname">First name:</label>
                                            <input className="splash-input" type="text" id="fname" name="fname" placeholder="John" required value={fname} onChange={e => setFname(e.target.value)} /><br />
                                        </div>
                                        <div className="input-container">
                                            <label htmlFor="lname">Last name:</label>
                                            <input className="splash-input" type="text" id="lname" name="lname" placeholder="Doe" value={lname} onChange={e => setLname(e.target.value)} /><br />
                                        </div>
                                        <div className="input-container">
                                            <label htmlFor="username">Username:</label>
                                            <input className="splash-input" type="text" id="username" name="username" placeholder="Username" required value={username} onChange={e => setUsername(e.target.value)} /><br />
                                        </div>
                                        <div className="input-container">
                                            <label htmlFor="email">Email:</label>
                                            <input className="splash-input" type="email" id="email" name="email" placeholder="johndoe1@email.com" required value={email} onChange={e => setEmail(e.target.value)} /><br />
                                        </div>
                                        <div className="input-container">
                                            <label htmlFor="password">Password:</label>
                                            <input className="splash-input" type="password" id="password" name="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} /><br />
                                        </div>
                                        <div className="input-container">
                                            <label htmlFor="confirm-pw">Confirm Password:</label>
                                            <input className="splash-input" type="password" id="confirm-pw" name="confirm-pw" placeholder="Confirm Password" required value={confirmPw} onChange={e => setConfirmPw(e.target.value)} /><br />
                                        </div>
                                    </div>
                                    <div className="agreement">
                                        <input className="splash-input" type="checkbox" id="tos" name="tos" required checked={tos} onChange={e => setTos(e.target.checked)} />
                                        <label htmlFor="tos">I have read and agree to the <Link to="/rules" className="splash-link">terms of service</Link>.</label>
                                    </div><br />
                                    <button type="submit" className="submit splash-button">Sign Up!</button>
                                </form>
                                <p>Already have an account? <Link to="/login" className="splash-link">Log in!</Link></p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default Signup;