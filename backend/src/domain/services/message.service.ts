import Message from "../entities/message";
import { MessageRepository } from "../ports/message.repository";
import { SendMessageDto } from "../dto/send-message.dto";
import UserDoesNotExist from "../exceptions/user-does-not-exist";
import UserService from "./user.service";

export default class MessageService {
    private readonly messageRepository: MessageRepository;
    private readonly userService: UserService;

    constructor(messageRepository: MessageRepository, userService: UserService) {
        this.messageRepository = messageRepository;
        this.userService = userService;
    }

    public async sendMessage(messageDto: SendMessageDto): Promise<Message> {
        console.log(messageDto);
        const user = await this.userService.getUserById(messageDto.userId);
        if (!user) {
            throw new UserDoesNotExist();
        }
        const message = new Message(messageDto.text, user);
        return this.messageRepository.save(message);
    }

    public getMessageHistory(): Promise<Message[]> {
        return this.messageRepository.getAll();
    }
}