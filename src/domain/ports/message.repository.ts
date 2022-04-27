import Message from "../entities/message";

export interface MessageRepository {
    save(message: Message): Promise<Message>;
    getAll(): Promise<Message[]>;
}