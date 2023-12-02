import React, { useState, useEffect } from "react";
import { Message } from "./Message";
import _ from 'lodash';

export function MessageWindow({ currentContact, updateNewChat, contactCallback,isNewChat }) {
    const [mostRecentMessage, setMostRecentMessage] = useState('');
    const [testMessages, setTestMessages] = useState([]);
    const [newName, setNewName] = useState('');

    useEffect(() => {
        fetch('data/messages.json')

        .then(response => {
            return response.json();
        })

        .then(data => {
            setTestMessages(data);
        })
    }, []);

    // updates most recent message based on input field
    function handleInput(e) {
        setMostRecentMessage(e.target.value);
    }

    function handleSetName(e) {
        setNewName(e.target.value);
    }

    // sends a message
    function handleSend(e) {
        e.preventDefault();
        let date = new Date();
        let mostRecentTime = date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') +  date.getMinutes();
        let mostRecentID = testMessages[testMessages.length - 1]['id'] + 1;
        setTestMessages([...testMessages, {'to': currentContact,
        'from': 'fakeUser',
        'message': mostRecentMessage,
        'time': mostRecentTime,
        'id': mostRecentID}]);
        deleteSent()
    }

    // resets most recent message (used for resetting input field after sending a message)
    function deleteSent() {
        setMostRecentMessage('');
    }

    // filters the messages for only those in the current conversation
    let messageList = testMessages.filter(message => message.to === currentContact || message.from === currentContact);
    messageList = _.sortBy(messageList, 'time');
    messageList = _.reverse(messageList);

    // creates the messages
    let messages = messageList.map(message => {
        let temp = <Message key={message.id} messageObj={message} currentContact={currentContact}></Message>
        return temp;
    });

    // creates a new contact
    function handleNewChat(e) {
        updateNewChat(e);
        contactCallback(newName);
        setNewName('');
    }

    // different header to allow user input for a new chat
    let headerReplacement = (
        <form className="name-input-wrapper" action="#">
            <input className="chat-name-input" type="text" placeholder="Enter Username" onChange={handleSetName} value={newName}/>
            <button className="chat-name-submit" type="submit" onClick={handleNewChat}></button>
        </form>
    );

    return (
        <div className="chat-window">
            <div className="chat-name-header">{isNewChat ? headerReplacement : currentContact}</div>
            <div className="chat-message-window">
                <form className="input-wrapper" action="#">
                    <input className="message-input" type="text" onChange={handleInput} value={mostRecentMessage} aria-label="messaging box" placeholder="Type message here"/>
                    <button className="chat-submit" type="submit" onClick={handleSend}>Send</button>
                </form>
                {messages}
            </div>
        </div>
    )
}