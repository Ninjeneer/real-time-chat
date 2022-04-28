import { CreateUserDto } from "../dto/create-user.dto";
import User from "../entities/user";
import UserAlreadyExist from "../exceptions/user-already-exist";
import UserRepository from "../ports/user.repository";
import bcrypt from "bcrypt";
import { LoginUserDto } from "../dto/login.dto";
import InvalidPassword from "../exceptions/invalid-password";

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

    public async login(dto: LoginUserDto): Promise<User> {
        const user = await this.userRepository.getUserByUsername(dto.username);
        if (!user || !this.comparePasswords(dto.password, user.getPassword())) {
            throw new InvalidPassword();
        }
        user.setToken(this.generateToken());
        await this.updateUser(user);
        return user;
    }

    public async getUserByUsername(username: string): Promise<User> {
        return await this.userRepository.getUserByUsername(username);
    }

    public async updateUser(user: User): Promise<User> {
        return await this.userRepository.saveUser(user);
    }

    private hashPassword(password: string): string {
        return bcrypt.hashSync(password, 10);
    }

    private comparePasswords(password: string, hashedPassword: string): boolean {
        return bcrypt.compareSync(password, hashedPassword);
    }

    private generateToken(): string {
        const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        return token;
    }
}