import React from "react";
import { Contacts } from "./Contacts";
import { Link } from "react-router-dom";

export function ContactWindow({ updateNewChat, contactList, contactCallback, isNewChat }) {
    return (
        <>
            <div className="contact-window">
                <div className="top-contacts">
                    <Link to='new-chat'><button className="new-chat-button" type="button" onClick={updateNewChat}>New Chat</button></Link>
                </div>
                <div className="chat-contacts">
                    <Contacts contactList={contactList} updateCallback={contactCallback} isNewChat={isNewChat}></Contacts>
                </div>
            </div>
        </>
    );
}