import { useEffect, useRef } from "react";

import HttpService from '../../services/http.service';
import { Message } from "../message/message";
import { Message as MessageEntity } from '../../entities/message';
import React from 'react';
import { User } from '../../entities/user';
import WebSocketService from '../../services/websocket.service';
import styled from 'styled-components';

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
        if (message.trim().length > 0) {
            // Remove trailing \n
            message = message.substring(0, message.length - 1);
            // Send the message to the server
            props.chatWSService.getWebSocket().send(JSON.stringify({ text: message, userId: getLocalUser().id }));
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
        <ChatContainer>
            <p>Welcome to the chat room !</p>
            <ChatContent id="chat-content">
                {messages.map((message, index) => <Message key={index} message={message} />)}
                <div ref={scrollAnchor}></div>
            </ChatContent>
            <div style={{ marginTop: '15px' }}>
                <div className="input-with-smiley" style={{ position: 'relative' }}>
                    <ChatTextArea placeholder='Envoyer un message' rows={2} onKeyUp={handleKeyPress.bind(this)} id="message-input"></ChatTextArea>
                    <EmojiButton src={require('./smiley.png')} alt='smiley' onClick={() => alert('Not yet :)')} />
                </div>
            </div>
        </ChatContainer>
    )
}

const ChatContainer = styled.div`
    background-color: rgb(212, 212, 212);
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 400px;
    height: 600px;
    text-align: left;
`

const ChatTextArea = styled.textarea`
    width: 100%;
    padding: 10px;
    border: none;
    background-color: rgb(240, 240, 240);
    box-sizing: border-box;
    resize: none;
`

const ChatContent = styled.div`
    width: 100%;
    height: 90%;
    overflow-y: auto;
`

const EmojiButton = styled.img`
    position: absolute;
    top: 10px;
    right: 10px;
    width: 20px;
`