import Message from "../entities/message";
import { SendMessageDto } from "../dto/send-message.dto";

export default interface MessageService {
    sendMessage(messageDto: SendMessageDto): Promise<Message>;
    getMessageHistory(): Promise<Message[]>;
}