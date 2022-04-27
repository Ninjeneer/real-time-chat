import Message from "../entities/message";
import { MessageRepository } from "../ports/message.repository";
import { SendMessageDto } from "../dto/send-message.dto";

export default class MessageService {
    private readonly messageRepository: MessageRepository;

    constructor(messageRepository: MessageRepository) {
        this.messageRepository = messageRepository;
    }

    public sendMessage(messageDto: SendMessageDto): Promise<Message> {
        const message = new Message(messageDto.text, messageDto.user);
        return this.messageRepository.save(message);
    }

    public getMessageHistory(): Promise<Message[]> {
        return this.messageRepository.getAll();
    }
}