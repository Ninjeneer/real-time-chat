import AuthenticationService from "../../../../src/domain/services/authentication.service";
import { CreateUserDto } from "../../../../src/domain/dto/create-user.dto";
import InvalidPassword from "../../../../src/domain/exceptions/invalid-password";
import UserAlreadyExist from "../../../../src/domain/exceptions/user-already-exist";
import UserRepository from "../../../../src/domain/ports/user.repository";
import UserRepositoryMock from "../user/user.repository.mock";
import UserService from "../../../../src/domain/services/user.service";
import UserServiceImpl from "../../../../src/domain/services/user.service";
import faker from "faker";

describe('AuthenticationService', () => {
    let userRepository: UserRepository;
    let userService: UserService;
    let authenticationService: AuthenticationService;

    beforeEach(() => {
        userRepository = new UserRepositoryMock();
        userService = new UserServiceImpl(userRepository);
        authenticationService = new AuthenticationService(userService);
    });

    it('should login', async () => {
        const request: CreateUserDto = { username: faker.internet.userName(), password: "123456" };
        const savedUser = await userService.saveUser(request);

        const loggedUser = await authenticationService.login({ username: request.username, password: request.password });
        expect(loggedUser).toBeDefined();
        expect(loggedUser.getUsername()).toEqual(savedUser.getUsername());
        expect(loggedUser.getToken()).toBeDefined();
    });

    it('should not login with valid username and invalid password', async () => {
        const request: CreateUserDto = { username: faker.internet.userName(), password: "123456" };
        const savedUser = await userService.saveUser(request);

        expect(authenticationService.login({ username: request.username, password: "xxx" })).rejects.toBeInstanceOf(InvalidPassword);
    });

    it('should not login with invalid username and invalid password', async () => {
        const request: CreateUserDto = { username: faker.internet.userName(), password: "123456" };
        const savedUser = await userService.saveUser(request);

        expect(authenticationService.login({ username: "xxx", password: "xxx" })).rejects.toBeInstanceOf(InvalidPassword);
    });
});