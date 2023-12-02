import React, { useState } from "react";
import { Onboard } from "./Onboard";
import { LogIn } from "./LogIn";
import { SignUp } from "./SignUp";

function App() {
    const [rightContent, updateRightContent] = useState("Onboard");

    function changeRight(type) {
        if (type === "Onboard") {
            return <Onboard updateCallback={updateOnClick}></Onboard>
        } else if (type === "SignUp") {
            return <SignUp></SignUp>
        } else if (type === "LogIn") {
            return <LogIn></LogIn>
        }
    }

    function updateOnClick(e) {
        updateRightContent(e.target.id);
    }

    return (
        <main className="splash-main">
            <div className="splash-container">
                <div className="splash-box">
                    <div className="splash-left-container">
                        <a href="./"><img src='../favicon.svg' aria-label="home button" className="splash-logo" alt="Card Marketplace Logo"/></a>
                    </div>
                    <div className={"splash-right-container" + (rightContent === "Onboard" ? " onboard-right" : "")}>
                        { changeRight(rightContent) }
                    </div>
                </div>
            </div>
        </main>
    );
}