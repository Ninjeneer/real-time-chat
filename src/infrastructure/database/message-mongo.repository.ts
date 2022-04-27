import { Collection } from "mongodb";
import Message from "../../domain/entities/message";
import { MessageRepository } from "../../domain/ports/message.repository";
import MongoDatabase from "./mongo";

export default class MessageMongoRepository implements MessageRepository {
    private collection?: Collection;

    constructor() {
        const database = MongoDatabase.getInstance();
        database.then((db) => this.collection = db.collection("messages"));
    }

    public async save(message: Message): Promise<Message> {
        await this.collection.insertOne(message);
        return message;
    }
    
    public async getAll(): Promise<Message[]> {
        const messages = await this.collection.find().toArray();
        return (await this.collection.find().toArray()).map((message) => new Message(message.text, message.user));
    }
}