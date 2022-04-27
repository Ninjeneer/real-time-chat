import { Db, MongoClient } from "mongodb";

export default class MongoDatabase {
    private static database: Db;

    public static async getInstance(): Promise<Db> {
        if (!MongoDatabase.database) {
            const client = await MongoClient.connect(process.env.DATABASE_URL);
            MongoDatabase.database = client.db();
            console.log("Connected to database");
        }
        return MongoDatabase.database;
    }
}