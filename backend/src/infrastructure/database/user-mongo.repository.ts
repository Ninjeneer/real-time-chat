import { Collection, ObjectId } from "mongodb";

import MongoDatabase from "./mongo";
import User from "../../domain/entities/user";
import UserRepository from "../../domain/ports/user.repository";

export default class UserMongoRepository implements UserRepository {

    private collection?: Collection;

    constructor() {
        const database = MongoDatabase.getInstance();
        database.then((db) => this.collection = db.collection("users"));
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
        const result = await this.collection.updateOne({ _id: new ObjectId(user.getId()) }, {
            $set: {
                username: user.getUsername(),
                password: user.getPassword(),
                color: user.getColor(),
                token: user.getToken()
            }
        }, { upsert: true });
        user.setId(result.upsertedId.toString());
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