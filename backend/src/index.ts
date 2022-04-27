import MessageMongoRepository from "./infrastructure/database/message-mongo.repository";
import MessageService from "./domain/services/message.service";
import Server from "./application/server";
import dotenv from "dotenv";

dotenv.config();

const messageRepository = new MessageMongoRepository();
const messageService = new MessageService(messageRepository);

const server = new Server(messageService);
server.start();