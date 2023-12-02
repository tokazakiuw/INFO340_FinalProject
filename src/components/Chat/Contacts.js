import React from "react";

export function Contacts({ updateCallback, contactList, isNewChat }) {

    // updates the current contact
    function handleContactUpdate(e) {
        updateCallback(e);
    }

    // creates list of contacts
    let newContactList = contactList.map(c => {
        let temp = (
            <div key={c} data-id={c} aria-label="contact button" role="button" className="single-contact" onClick={handleContactUpdate}>{c}</div>
        );
        return temp;
    });

    // a temporary contact for new chat
    let newChatContact = (
        <div data-id="NewChat" key="NewChat" aria-label="contact button" role="button" className="single-contact new-chat" onClick={handleContactUpdate}>New Chat</div>
    );

    return (
        <>
            {isNewChat ? newChatContact : <></>}
            {newContactList}
        </>
    );
}