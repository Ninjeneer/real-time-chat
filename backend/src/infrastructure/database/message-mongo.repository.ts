import { Collection, ObjectId } from "mongodb";

import Message from "../../domain/entities/message";
import { MessageRepository } from "../../domain/ports/message.repository";
import MongoDatabase from "./mongo";
import User from "../../domain/entities/user";
import sanitize from "mongo-sanitize";

export default class MessageMongoRepository implements MessageRepository {
    private collection?: Collection;

    constructor() {
        const database = MongoDatabase.getInstance();
        database.then((db) => this.collection = db.collection("messages"));
    }

    public async save(message: Message): Promise<Message> {
        const insertion = await this.collection.insertOne({
            text: sanitize(message.text),
            userId: sanitize(new ObjectId(message.user.getId()))
        });

        const mdbMessage = await this.collection.aggregate([
            { $match: { _id: new ObjectId(insertion.insertedId) } },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            }
        ]).toArray();
        return new Message(mdbMessage[0].text, new User(mdbMessage[0].user[0].username, mdbMessage[0].user[0].password, mdbMessage[0].user[0].color, mdbMessage[0].user[0]._id.toString()));
    }

    public async getAll(): Promise<Message[]> {
        const messages = await this.collection.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            }
        ]).toArray();
        return (messages).map((message) =>
            new Message(
                message.text,
                new User(message.user[0].username, message.user[0].password, message.user[0].color, message.user[0]._id.toString())
            )
        );
    }
}