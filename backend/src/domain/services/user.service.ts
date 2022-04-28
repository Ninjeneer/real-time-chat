import { CreateUserDto } from "../dto/create-user.dto";
import User from "../entities/user";
import UserAlreadyExist from "../exceptions/user-already-exist";
import UserRepository from "../ports/user.repository";
import bcrypt from "bcrypt";
import { LoginUserDto } from "../dto/login.dto";

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
            throw new Error("Invalid password");
        }
        return user;
    }

    public async getUserByUsername(username: string): Promise<User> {
        return await this.userRepository.getUserByUsername(username);
    }

    public hashPassword(password: string): string {
        return bcrypt.hashSync(password, 10);
    }

    public comparePasswords(password: string, hashedPassword: string): boolean {
        return bcrypt.compareSync(password, hashedPassword);
    }
}