import { CreateUserDto } from "../../../../src/domain/dto/create-user.dto";
import UserAlreadyExist from "../../../../src/domain/exceptions/user-already-exist";
import UserRepository from "../../../../src/domain/ports/user.repository";
import UserRepositoryMock from "./user.repository.mock";
import UserService from "../../../../src/domain/services/user.service";

describe('UserService', () => {
    let userRepository: UserRepository;
    let userService: UserService;

    beforeEach(() => {
        userRepository = new UserRepositoryMock();
        userService = new UserService(userRepository);
    });

    it('should save a user', async () => {
        const request: CreateUserDto = { username: "Loan", password: "123456" };
        const savedUser = await userService.saveUser(request);
        expect(savedUser.getUsername()).toEqual(request.username);
        expect(savedUser.getPassword()).not.toEqual(request.password);
    });

    it('should not save a user that already exists', async () => {
        const request: CreateUserDto = { username: "Loan", password: "123456" };
        const request2: CreateUserDto = { username: "Loan", password: "abcdef" };
        await userService.saveUser(request);
        expect(userService.saveUser(request)).rejects.toBeInstanceOf(UserAlreadyExist);
    });

    it('should find a user by username', async () => {
        await userService.saveUser({ username: "Loan", password: "123456" });
        const user = await userService.getUserByUsername("Loan");
        expect(user).toBeDefined();
        expect(user.getUsername()).toEqual("Loan");
    });

    it('should not find an unexisting user by username', async () => {
        const user = await userService.getUserByUsername("xxx");
        expect(user).not.toBeDefined();
    });
});