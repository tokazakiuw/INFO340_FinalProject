import React from "react";

export function Onboard(props) {
    return (
        <>
            <div className="options">
                <p>New To The Trading Card App?</p>
                <a className="button-link" href="./signup.html"><div id="SignUp" className="onboard-button" role="button" onClick={props.updateCallback}>Create Account</div></a>
            </div>
            <div className="options">
                <p>Returning User?</p>
                <a id="LogIn" className="button-link" href="./login.html" onClick={props.updateCallback}><div className="onboard-button" role="button">Log In</div></a>
            </div>
        </>
    );
}