import fastify, { FastifyInstance } from "fastify";

import AuthenticationService from "../domain/services/authentication.service";
import MessageController from "./controllers/message.controller";
import MessageService from "../domain/services/message.service";
import UserController from "./controllers/user.controller";
import UserService from "../domain/adapters/user.service";
import fastifyCors from "fastify-cors";
import { removePassword } from "./middleware/remove-password.middleware";

export default class Server {
    private readonly server: FastifyInstance;
    private readonly messageController: MessageController;
    private readonly userController: UserController;

    constructor(messageService: MessageService, userService: UserService, authenticationService: AuthenticationService) {
        this.server = fastify({ logger: true });
        this.server.register(fastifyCors);

        // Remove every password attribute in responses
        this.server.addHook("onSend", (request, reply, payload: string, done) => {
            try {
                const parsedPayload = JSON.parse(payload);
                removePassword(parsedPayload);
                done(null, JSON.stringify(parsedPayload));
            } catch (e) {
                done(null, JSON.stringify(payload));
            }
                
        });

        this.messageController = new MessageController(this.server, messageService, authenticationService);
        this.userController = new UserController(this.server, userService, authenticationService);
    }

    public start(): void {
        this.messageController.initRoutes();
        this.userController.initRoutes();
        this.server.listen(process.env.PORT || 3000);
    }
}