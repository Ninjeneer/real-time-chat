import AuthenticationService from "../../domain/services/authentication.service";
import { FastifyInstance } from "fastify";
import FastifyWebSocket from "fastify-websocket";
import InvalidToken from "../../domain/exceptions/invalid-token";
import Message from "../../domain/entities/message";
import MessageService from "../../domain/services/message.service";

export default class MessageController {
    private readonly messageService: MessageService;
    private readonly authenticationService: AuthenticationService;
    private fastifyInstance: FastifyInstance;

    constructor(fastifyInstance: FastifyInstance, messageService: MessageService, authenticationService: AuthenticationService) {
        this.fastifyInstance = fastifyInstance;
        this.messageService = messageService;
        this.authenticationService = authenticationService;

        this.fastifyInstance.register(FastifyWebSocket);
    }

    public initRoutes(): void {
        this.fastifyInstance.get('/chat', { websocket: true }, (connection, req) => {
            connection.on('data', async (data) => {
                try {
                    const message = JSON.parse(data.toString()); 
                    const sentMessage = await this.messageService.sendMessage({ text: message.text, userId: message.userId });
                    this.fastifyInstance.websocketServer.clients.forEach(client => {
                        client.send(JSON.stringify(sentMessage));
                    });
                } catch (e) {
                    connection.socket.send("An error occurred");
                }
                
            });
        });

        this.fastifyInstance.get('/chat/history', async (req, res) => {
            try {
                // Authenticate user
                await this.authenticationService.authenticateByToken(req.headers['authorization'].split(" ")[1]);
                // Retrieve and return the message history
                const messages = await this.messageService.getMessageHistory();
                res.send(messages);
            } catch (e) {
                if (e instanceof InvalidToken) {
                    res.status(401).send(e.message);
                } else {
                    res.status(500).send("An error occurred");
                }
                console.log(e)
            }
        });
    }
}