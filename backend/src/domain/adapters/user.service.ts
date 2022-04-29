import { CreateUserDto } from "../dto/create-user.dto";
import User from "../entities/user";

export default interface UserService {
    saveUser(dto: CreateUserDto): Promise<User>;
    getUserByUsername(username: string): Promise<User>;
    updateUser(user: User): Promise<User>;
    getUserByToken(token: string): Promise<User>;
    getUserById(id: string): Promise<User>;
}