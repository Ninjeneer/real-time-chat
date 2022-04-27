import { FastifyInstance } from "fastify";
import FastifyWebSocket from "fastify-websocket";
import Message from "../domain/entities/message";
import MessageService from "../domain/services/message.service";

export default class MessageController {
    private readonly messageService: MessageService;
    private fastifyInstance: FastifyInstance;

    constructor(fastifyInstance: FastifyInstance, messageService: MessageService) {
        this.fastifyInstance = fastifyInstance;
        this.messageService = messageService;

        this.fastifyInstance.register(FastifyWebSocket);
    }

    public initRoutes(): void {
        this.fastifyInstance.get('/chat', { websocket: true }, (connection, req) => {
            connection.on('data', async (data) => {
                const message = JSON.parse(data.toString()); 
                console.log(data.toString()) 
                const sentMessage = await this.messageService.sendMessage(new Message(message.text, message.user));
                this.fastifyInstance.websocketServer.clients.forEach(client => {
                    client.send(JSON.stringify(sentMessage));
                });
            });
        });

        this.fastifyInstance.get('/chat/history', async (req, res) => {
            const messages = await this.messageService.getMessageHistory();
            res.send(messages);
        });
    }
}