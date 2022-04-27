import './chat.css'

import Message from "../message/message";
import React from "react";

export default class Chat extends React.Component {
    render() {
        return (
            <div className="chat-container">
                <div className="chat-content">
                    <Message></Message>
                    <Message></Message>
                    <Message></Message>
                </div>
                <div className="chat-input">
                    <textarea placeholder='Envoyer un message' rows={2}></textarea>
                </div>
            </div>
        )
    }
}