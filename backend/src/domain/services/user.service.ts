import { CreateUserDto } from "../dto/create-user.dto";
import User from "../entities/user";
import UserAlreadyExist from "../exceptions/user-already-exist";
import UserRepository from "../ports/user.repository";
import bcrypt from "bcrypt";

export default class UserService {
    private readonly userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async saveUser(dto: CreateUserDto): Promise<User> {
        let user = await this.userRepository.getUserByUsername(dto.username);
        if (user) {
            throw new UserAlreadyExist();
        }

        user = new User(dto.username);
        user.setPassword(this.hashPassword(dto.password));
        return await this.userRepository.saveUser(user);
    }

    public async getUserByUsername(username: string): Promise<User> {
        return await this.userRepository.getUserByUsername(username);
    }

    public async updateUser(user: User): Promise<User> {
        return await this.userRepository.saveUser(user);
    }

    public async getUserByToken(token: string): Promise<User> {
        return await this.userRepository.getUserByToken(token);
    }

    public async getUserById(id: string): Promise<User> {
        return await this.userRepository.getUserById(id);
    }

    private hashPassword(password: string): string {
        return bcrypt.hashSync(password, 10);
    }
}