import React from "react";

export function Message(props) {
    
    if (props.messageObj.to === props.currentContact) { //user's message
        return (
            <div className="message-wrapper">
                <div className="empty-message right-empty">{props.messageObj.time}</div>
                <div className="single-message">{props.messageObj.message}</div>
            </div>
        );
    } else { // contact's message
        return (
            <div className="message-wrapper">
                <div className="single-message">{props.messageObj.message}</div>
                <div className="empty-message">{props.messageObj.time}</div>
            </div>
        );
    }
}