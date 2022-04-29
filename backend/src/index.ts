import AuthenticationService from "./domain/services/authentication.service";
import MessageMongoRepository from "./infrastructure/database/message-mongo.repository";
import MessageService from "./domain/services/message.service";
import MongoDatabase from "./infrastructure/database/mongo";
import Server from "./application/server";
import UserMongoRepository from "./infrastructure/database/user-mongo.repository";
import UserRepositoryMock from "../test/domain/services/user/user.repository.mock";
import UserService from "./domain/services/user.service";
import dotenv from "dotenv";

dotenv.config();

// Only start the server if the database is connected
MongoDatabase.getInstance().then(() => {
    const userRepository = new UserMongoRepository();
    const userService = new UserService(userRepository);

    const messageRepository = new MessageMongoRepository();
    const messageService = new MessageService(messageRepository, userService);

    const authenticationService = new AuthenticationService(userService);

    // Dependency injection
    const server = new Server(messageService, userService, authenticationService);
    server.start();
});

