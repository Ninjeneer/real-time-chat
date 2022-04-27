import MessageRepositoryMock from "../test/domain/services/message.repository.mock";
import MessageService from "./domain/services/message.service";
import Server from "./application/server";

const messageRepository = new MessageRepositoryMock();
const messageService = new MessageService(messageRepository);

const server = new Server(messageService);
server.start();