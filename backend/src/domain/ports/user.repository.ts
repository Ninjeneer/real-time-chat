import User from "../entities/user";

export default interface UserRepository {
    saveUser(user: User): Promise<User>;
    getUserByUsername(username: string): Promise<User>;
}