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
    private scrollAnchor = React.createRef<HTMLDivElement>();

    constructor(props: any) {
        super(props);
        this.state = {
            messages: [],
        }
        this.ws = new WebSocket(URL);
    }

    componentDidMount() {
        // Get the history chat
        fetch('http://localhost:3000/chat/history').then((response) => response.json()).then((messages) => this.setState({ messages })).then(() => this.scrollToBottom());

        this.ws.onopen = () => {
            console.log('connected');
        }

        // Listen for messages
        this.ws.onmessage = (event) => {
            // Parse the message
            const message = JSON.parse(event.data);
            // Add the message to the state
            this.setState({
                messages: [...this.state.messages, message]
            });
            this.scrollToBottom();
        }

        this.ws.onclose = () => {
            console.log('disconnected');
        }
    }

    private handleKeyPress(key): void {
        // Send the message when the user press enter
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
            // Send the message to the server
            this.ws.send(JSON.stringify({ text: message, user: 'me' }));
            // Reset the input field
            messageInput.value = '';
        }
    }

    private scrollToBottom(): void {
        setTimeout(() => this.scrollAnchor.current.scrollIntoView({ behavior: 'smooth' }), 100);
    }

    render() {
        return (
            <div className="chat-container">
                <p>Welcome to the chat room !</p>
                <div className="chat-content" id="chat-content">
                    { this.state.messages.map((message, index) => <Message key={index} message={message} />) }
                    <div ref={this.scrollAnchor}></div>
                </div>
                <div className="chat-input">
                    <textarea placeholder='Envoyer un message' rows={2} onKeyUp={this.handleKeyPress.bind(this)} id="message-input"></textarea>
                </div>
            </div>
        )
    }
}