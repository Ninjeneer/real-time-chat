import User from "../../../../src/domain/entities/user";
import UserRepository from "../../../../src/domain/ports/user.repository";

export default class UserRepositoryMock implements UserRepository {
    private users: User[] = [];

    public saveUser(user: User): Promise<User> {
        this.users.push(user);
        return Promise.resolve(user);
    }

    public getUserByUsername(username: string): Promise<User> {
        return Promise.resolve(this.users.find(u => u.getUsername() === username));
    }

    public getUserByToken(token: string): Promise<User> {
        return Promise.resolve(this.users.find(u => u.getToken() === token));
    }

    public getUserById(id: string): Promise<User> {
        return Promise.resolve(this.users.find(u => u.getId() === id));
    }
}