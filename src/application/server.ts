import fastify, { FastifyInstance } from "fastify";

import MessageController from "./message.controller";
import MessageService from "../domain/services/message.service";

export default class Server {
    private readonly server: FastifyInstance;
    private readonly messageController: MessageController;

    constructor(messageService: MessageService) {
        this.server = fastify({ logger: true });
        this.messageController = new MessageController(this.server, messageService);
    }

    public start(): void {
        this.messageController.initRoutes();
        this.server.listen(process.env.PORT || 3000);
    }
}