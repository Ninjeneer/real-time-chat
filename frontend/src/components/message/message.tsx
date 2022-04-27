import './message'

import { Message as MessageEntity } from '../../entities/message'
import React from "react";

type Props = {
    message: MessageEntity;
}
export default class Message extends React.Component<Props, {}> {
    render() {
        return (
            <div className="message">
                <p><b>{this.props.message.user} :</b> {this.props.message.text}</p>
            </div>
        )
    }
}