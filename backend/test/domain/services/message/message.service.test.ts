import Message from "../../../../src/domain/entities/message";
import { MessageRepository } from "../../../../src/domain/ports/message.repository";
import MessageRepositoryMock from "./message.repository.mock";
import MessageService from "../../../../src/domain/services/message.service";
import User from "../../../../src/domain/entities/user";
import faker from "faker";

describe('MessageService', () => {
    let messageRepository: MessageRepository;
    let messageService: MessageService;

    beforeEach(() => {
        messageRepository = new MessageRepositoryMock();
        messageService = new MessageService(messageRepository);
    });

    it('should save a sent message', async () => {
        const message = new Message("message test", new User(faker.internet.userName()));
        const sentMessage = await messageService.sendMessage({ text: message.text, user: message.user });
        expect(sentMessage.text).toEqual(message.text);
        expect(sentMessage.user).toEqual(message.user);
    });

    it('should get all messages', async () => {
        const m1 = await messageService.sendMessage(new Message("message 1", new User(faker.internet.userName())));
        const m2 = await messageService.sendMessage(new Message("message 2", new User(faker.internet.userName())));
        const messages = await messageService.getMessageHistory();
        expect(messages).toHaveLength(2);
        expect(messages).toContain(m1);
        expect(messages).toContain(m2);
    });
});