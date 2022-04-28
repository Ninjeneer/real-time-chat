import './chat.css'

import { useEffect, useRef, useState } from "react";

import HttpService from '../../services/http.service';
import Message from "../message/message";
import WebSocketService from '../../services/websocket.service';

type Props = {
    chatWSService: WebSocketService;
    httpService: HttpService;
}

export const Chat = (props: Props) => {
    const scrollAnchor = useRef(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Get the history chat
        props.httpService.getMessageHistory()
            .then((m) => setMessages(m))
            .then(() => scrollToBottom())

        props.chatWSService.getWebSocket().onopen = () => {
            console.log('connected');
        }

        // Listen for messages
        props.chatWSService.getWebSocket().onmessage = (event) => {
            // Parse the message
            const m = JSON.parse(event.data);
            // Add the message to the state
            setMessages((messages) => [...messages, m]);
            scrollToBottom();
        }

        props.chatWSService.getWebSocket().onclose = () => {
            console.log('disconnected');
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

    const getLocalUser = (): string => {
        return localStorage.getItem("user");
    }

    return (
        <div className="chat-container">
            <p>Welcome to the chat room !</p>
            <div className="chat-content" id="chat-content">
                {messages.map((message, index) => <Message key={index} message={message} />)}
                <div ref={scrollAnchor}></div>
            </div>
            <div className="chat-input">
                <textarea placeholder='Envoyer un message' rows={2} onKeyUp={handleKeyPress.bind(this)} id="message-input"></textarea>
            </div>
        </div>
    )

}