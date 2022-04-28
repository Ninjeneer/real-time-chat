import MessageMongoRepository from "./infrastructure/database/message-mongo.repository";
import MessageService from "./domain/services/message.service";
import Server from "./application/server";
import UserRepositoryMock from "../test/domain/services/user/user.repository.mock";
import UserService from "./domain/services/user.service";
import dotenv from "dotenv";

dotenv.config();

const messageRepository = new MessageMongoRepository();
const messageService = new MessageService(messageRepository);

const userRepository = new UserRepositoryMock();
const userService = new UserService(userRepository);

const server = new Server(messageService, userService);
server.start();