import Message from "../entities/message";
import { MessageRepository } from "../ports/message.repository";

export default class MessageService {
    private readonly messageRepository: MessageRepository;

    constructor(messageRepository: MessageRepository) {
        this.messageRepository = messageRepository;
    }

    public sendMessage(message: Message): Promise<Message> {
        return this.messageRepository.save(message);
    }

    public getMessageHistory(): Promise<Message[]> {
        return this.messageRepository.getAll();
    }
}