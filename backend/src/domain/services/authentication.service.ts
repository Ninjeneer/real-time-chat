import InvalidPassword from "../exceptions/invalid-password";
import InvalidToken from "../exceptions/invalid-token";
import { LoginUserDto } from "../dto/login.dto";
import User from "../entities/user";
import UserService from "./user.service";
import bcrypt from "bcrypt";

export default class AuthenticationService {
    private readonly userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    public async login(dto: LoginUserDto): Promise<User> {
        const user = await this.userService.getUserByUsername(dto.username);
        if (!user || !this.comparePasswords(dto.password, user.getPassword())) {
            throw new InvalidPassword();
        }
        user.setToken(this.generateToken());
        await this.userService.updateUser(user);
        return user;
    }

    public async authenticateByToken(token: string): Promise<User> {
        const user = await this.userService.getUserByToken(token);
        if (!user) {
            throw new InvalidToken();
        }
        return user;
    }

    private comparePasswords(password: string, hashedPassword: string): boolean {
        return bcrypt.compareSync(password, hashedPassword);
    }

    private generateToken(): string {
        const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        return token;
    }
}