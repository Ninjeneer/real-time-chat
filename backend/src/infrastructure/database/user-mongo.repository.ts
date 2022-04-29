import { Collection, ObjectId } from "mongodb";

import MongoDatabase from "./mongo";
import User from "../../domain/entities/user";
import UserRepository from "../../domain/ports/user.repository";
import sanitize from "mongo-sanitize";

export default class UserMongoRepository implements UserRepository {

    private collection?: Collection;

    constructor() {
        const database = MongoDatabase.getInstance();
        database.then((db) => this.collection = db.collection("users"));
    }

    public async getUserByToken(token: string): Promise<User> {
        const user = await this.collection.findOne({ token });
        if (user) {
            return new User(user.get, user.password, user.color, user._id.toString());
        }
        return null;
    }

    /**
     * Insert or update a user
     * @param user user to insert/update
     * @returns inserted/updated user
     */
    public async saveUser(user: User): Promise<User> {
        if (!user.getId()) {
            user.setId(new ObjectId().toString());
        }
        const result = await this.collection.updateOne({ _id: new ObjectId(sanitize(user.getId())) }, {
            $set: {
                username: sanitize(user.getUsername()),
                password: sanitize(user.getPassword()),
                color: sanitize(user.getColor()),
                token: sanitize(user.getToken())
            }
        }, { upsert: true });
        if (result.upsertedId) {
            user.setId(result.upsertedId.toString());
        }
        return user;
    }

    public async getUserByUsername(username: string): Promise<User> {
        const user = await this.collection.findOne({ username });
        if (user) {
            return new User(user.username, user.password, user.color, user._id.toString());
        }
        return null;
    }
}