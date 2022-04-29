import './chat.css'

import { useEffect, useRef } from "react";

import HttpService from '../../services/http.service';
import { Message } from "../message/message";
import { Message as MessageEntity } from '../../entities/message';
import React from 'react';
import { User } from '../../entities/user';
import WebSocketService from '../../services/websocket.service';

type Props = {
    chatWSService: WebSocketService;
    httpService: HttpService;
}

export const Chat = (props: Props) => {
    const scrollAnchor = useRef(null);
    const [messages, setMessages] = React.useState<MessageEntity[]>([]);

    useEffect(() => {
        // Get the history chat
        props.httpService.getMessageHistory()
            .then((m) => setMessages(m))
            .then(() => scrollToBottom());

        // Listen for messages
        props.chatWSService.getWebSocket().onmessage = (event) => {
            // Parse the message
            const m = JSON.parse(event.data);
            // Add the message to the state
            console.log(m)
            setMessages((messages) => [...messages, m]);
            scrollToBottom();
        }
    }, [])

    const handleKeyPress = (key): void => {
        // Send the message when the user press enter
        if (key.keyCode === 13) {
            sendMessage();
        }
    }

    const sendMessage = (): void => {
        const messageInput = document.getElementById('message-input') as HTMLInputElement;
        let message = messageInput.value;
        if (message.length > 0) {
            // Remove trailing \n
            message = message.substring(0, message.length - 1);
            // Send the message to the server
            props.chatWSService.getWebSocket().send(JSON.stringify({ text: message, user: getLocalUser() }));
            // Reset the input field
            messageInput.value = '';
        }
    }

    const scrollToBottom = (): void => {
        setTimeout(() => scrollAnchor.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }

    const getLocalUser = (): User => {
        return JSON.parse(localStorage.getItem("user"));
    }

    return (
        <div className='container'>
            <div className="chat-container">
                <p>Welcome to the chat room !</p>
                <div className="chat-content" id="chat-content">
                    {messages.map((message, index) => <Message key={index} message={message} />)}
                    <div ref={scrollAnchor}></div>
                </div>
                <div className="chat-input">
                    <div className="input-with-smiley">
                        <textarea placeholder='Envoyer un message' rows={2} onKeyUp={handleKeyPress.bind(this)} id="message-input"></textarea>
                        <img src={require('./smiley.png')} alt='smiley' onClick={() => alert('Not yet :)')} />
                    </div>
                </div>
            </div>
        </div>

    )

}