import React, { useEffect, useState } from "react";
import { ContactWindow } from "./ContactWindow";
import { MessageWindow } from "./MessageWindow";

export function Chat() {
    const [contacts, setContacts] = useState([]);
    const [isNewChat, setNewChat] = useState(false);
    const [currContact, setCurrContact] = useState('');

    useEffect(() => {
        fetch('data/contacts.json')

        .then(response => {
            return response.json();
        })

        .then(data => {
            let initialContacts = data.map(contact => {
                let temp = contact.username;
                return temp;
            });
            setContacts(initialContacts);
            setCurrContact(contacts[0]);
        })

        .catch(e => console.log("Sorry"));
    }, []);

    // updates the current contact and list of contacts
    function handleUpdateCC(e) {
        let id;
        if (e.target) {
            id = e.target.getAttribute('data-id');
        } else {
            id = e;
        }
        setCurrContact(id);
        if (!contacts.includes(id)) setContacts([id, ...contacts]);
    }

    // updates whether the user is making a new chat or not
    function updateNewChat(e) {
        e.preventDefault();
        setNewChat(!isNewChat);
        setCurrContact('');
    }

    return (
        <main className="chat-main">
            <ContactWindow contactList={contacts} contactCallback={handleUpdateCC} updateNewChat={updateNewChat} isNewChat={isNewChat}></ContactWindow>
            <MessageWindow contactCallback={handleUpdateCC} currentContact={currContact} updateNewChat={updateNewChat} isNewChat={isNewChat}></MessageWindow>
        </main>
    );
}