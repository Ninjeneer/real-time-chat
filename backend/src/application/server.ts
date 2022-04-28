import fastify, { FastifyInstance } from "fastify";

import MessageController from "./controllers/message.controller";
import MessageService from "../domain/services/message.service";
import UserController from "./controllers/user.controller";
import UserService from "../domain/services/user.service";
import fastifyCors from "fastify-cors";

export default class Server {
    private readonly server: FastifyInstance;
    private readonly messageController: MessageController;
    private readonly userController: UserController;

    constructor(messageService: MessageService, userService: UserService) {
        this.server = fastify({ logger: true });
        this.server.register(fastifyCors);
        
        this.messageController = new MessageController(this.server, messageService);
        this.userController = new UserController(this.server, userService);
    }

    public start(): void {
        this.messageController.initRoutes();
        this.userController.initRoutes();
        this.server.listen(process.env.PORT || 3000);
    }
}