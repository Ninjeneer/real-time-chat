import { Db, MongoClient } from "mongodb";

export default class MongoDatabase {
    private static client: MongoClient;
    private static database: Db;

    public static async getInstance(): Promise<Db> {
        if (!MongoDatabase.database) {
            const client = await MongoClient.connect(process.env.DATABASE_URL);
            MongoDatabase.client = client;
            MongoDatabase.database = client.db();
            console.log("Connected to database");
        }
        return MongoDatabase.database;
    }

    public static async close(): Promise<void> {
        if (MongoDatabase.client) {
            await MongoDatabase.client.close();
            console.log("Disconnected from database");
        }
    }
}