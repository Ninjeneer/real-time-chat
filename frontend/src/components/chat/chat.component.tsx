import './chat.css'

import Message from "../message/message";
import { Message as MessageEntity } from "../../entities/message";
import React from "react";

const URL = 'ws://localhost:3000/chat';

type State = {
    messages: MessageEntity[],
}

export default class Chat extends React.Component<{}, State> {
    private ws: WebSocket;

    constructor(props: any) {
        super(props);
        this.state = {
            messages: [],
        }
        this.ws = new WebSocket(URL)
    }

    componentDidMount() {
        this.ws.onopen = () => {
            console.log('connected');
        }

        this.ws.onmessage = (event) => {
            console.log(event)
            const message = JSON.parse(event.data);
            this.setState({
                messages: [...this.state.messages, message]
            });
        }

        this.ws.onclose = () => {
            console.log('disconnected');
        }
    }

    private handleKeyPress(key): void {
        if (key.keyCode === 13) {
            this.sendMessage();
        }
    }

    private sendMessage(): void {
        const messageInput = document.getElementById('message-input') as HTMLInputElement;
        let message = messageInput.value;
        if (message.length > 0) {
            // Remove trailing \n
            message = message.substring(0, message.length - 1);
            this.ws.send(JSON.stringify({ text: message, user: 'me' }));
            messageInput.value = '';
        }
    }

    render() {
        return (
            <div className="chat-container">
                <p>Welcome to the chat room !</p>
                <div className="chat-content">
                    { this.state.messages.map((message, index) => <Message key={index} message={message} />) }
                </div>
                <div className="chat-input">
                    <textarea placeholder='Envoyer un message' rows={2} onKeyUp={this.handleKeyPress.bind(this)} id="message-input"></textarea>
                </div>
            </div>
        )
    }
}