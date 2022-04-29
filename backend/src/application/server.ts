import fastify, { FastifyInstance } from "fastify";

import AuthenticationService from "../domain/services/authentication.service";
import MessageController from "./controllers/message.controller";
import MessageService from "../domain/services/message.service";
import UserController from "./controllers/user.controller";
import UserService from "../domain/services/user.service";
import fastifyCors from "fastify-cors";

export default class Server {
    private readonly server: FastifyInstance;
    private readonly messageController: MessageController;
    private readonly userController: UserController;

    constructor(messageService: MessageService, userService: UserService, authenticationService: AuthenticationService) {
        this.server = fastify({ logger: true });
        this.server.register(fastifyCors);

        this.messageController = new MessageController(this.server, messageService, authenticationService);
        this.userController = new UserController(this.server, userService, authenticationService);
    }

    public start(): void {
        this.messageController.initRoutes();
        this.userController.initRoutes();
        this.server.listen(process.env.PORT || 3000);
    }
}