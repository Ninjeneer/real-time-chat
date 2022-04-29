import Message from "../../../../src/domain/entities/message";
import { MessageRepository } from "../../../../src/domain/ports/message.repository";
import MessageRepositoryMock from "./message.repository.mock";
import MessageService from "../../../../src/domain/services/message.service";
import MessageServiceImpl from "../../../../src/domain/services/message.service";
import UserRepository from "../../../../src/domain/ports/user.repository";
import UserRepositoryMock from "../user/user.repository.mock";
import UserService from "../../../../src/domain/adapters/user.service";
import UserServiceImpl from "../../../../src/domain/services/user.service";
import faker from "faker";

describe('MessageService', () => {

    let userRepository: UserRepository;
    let userService: UserService;

    let messageRepository: MessageRepository;
    let messageService: MessageService;

    beforeEach(() => {
        userRepository = new UserRepositoryMock();
        userService = new UserServiceImpl(userRepository);

        messageRepository = new MessageRepositoryMock();
        messageService = new MessageServiceImpl(messageRepository, userService);
    });

    it('should save a sent message', async () => {
        const user = await userService.saveUser({ username: faker.internet.userName(), password: "123456" });
        const message = new Message("message test", user);
        const sentMessage = await messageService.sendMessage({ text: message.text, userId: message.user.getId() });
        expect(sentMessage.text).toEqual(message.text);
        expect(sentMessage.user).toEqual(message.user);
    });

    it('should get all messages', async () => {
        const user = await userService.saveUser({ username: faker.internet.userName(), password: "123456" });

        const m1 = await messageService.sendMessage({ text: "message 1", userId: user.getId() });
        const m2 = await messageService.sendMessage({ text: "message 2", userId: user.getId() });
        const messages = await messageService.getMessageHistory();
        expect(messages).toHaveLength(2);
        expect(messages).toContain(m1);
        expect(messages).toContain(m2);
    });
});