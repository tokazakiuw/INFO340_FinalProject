import React from "react";

export function SignUp(props) {
    return (
        <>
            <h1 className="text-inside">Welcome!</h1>
            <form action="#" className="form">
                <div className="fields">
                    <div className="input-container">
                        <label for="fname">First name:</label>
                        <input className="splash-input" type="text" id="fname" name="fname" placeholder="John" required /><br/>
                    </div>
                    <div className="input-container">
                        <label for="lname">Last name:</label>
                        <input className="splash-input" type="text" id="lname" name="lname" placeholder="Doe" /><br/>
                    </div>
                    <div className="input-container">
                        <label for="username">Username:</label>
                        <input className="splash-input" type="text" id="username" name="username" placeholder="Username" required /><br/>
                    </div>
                    <div className="input-container">
                        <label for="email">Email:</label>
                        <input className="splash-input" type="email" id="email" name="email" placeholder="johndoe1@email.com" required /><br/>
                    </div>
                    <div className="input-container">
                        <label for="password">Password:</label>
                        <input className="splash-input" type="password" id="password" name="password" placeholder="Password" required /><br/>
                    </div>
                    <div className="input-container">
                        <label for="confirm-pw">Confirm Password:</label>
                        <input className="splash-input" type="password" id="confirm-pw" name="confirm-pw" placeholder="Confirm Password" required /><br/>
                    </div>
                </div>
                <div className="agreement">
                    <input className="splash-input" type="checkbox" id="tos" name="tos"
                    required />
                    <label for="tos">I have read and agree to the <a className="splash-link" href="./rules.html">terms of service</a>.</label>
                </div><br/>
                <button type="submit" className="submit splash-button">Sign Up!</button>
            </form>
            <p>Already have an account? <a className="splash-link" href="./login.html">Log in!</a></p>
        </>
    )
}