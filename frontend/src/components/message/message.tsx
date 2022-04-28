import './message'

import { Message as MessageEntity } from '../../entities/message'

type Props = {
    message: MessageEntity;
}

export const Message = (props: Props) => {
    return (
        <div className="message">
            <p><b style={{ 'color': props.message.user.color }}>{props.message.user.username} :</b> {props.message.text}</p>
        </div>
    )
}