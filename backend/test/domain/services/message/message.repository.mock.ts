import Message from "../../../../src/domain/entities/message";
import { MessageRepository } from "../../../../src/domain/ports/message.repository";

export default class MessageRepositoryMock implements MessageRepository {
    private messages: Message[] = [];

    public save(message: Message): Promise<Message> {
        this.messages.push(message);
        return Promise.resolve(message);
    }

    public getAll(): Promise<Message[]> {
        return Promise.resolve(this.messages);
    }
}