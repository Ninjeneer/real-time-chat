import { CreateUserDto } from "../../../src/domain/dto/create-user.dto";
import MongoDatabase from "../../../src/infrastructure/database/mongo";
import UserAlreadyExist from "../../../src/domain/exceptions/user-already-exist";
import UserMongoRepository from "../../../src/infrastructure/database/user-mongo.repository";
import UserRepository from "../../../src/domain/ports/user.repository";
import UserService from "../../../src/domain/services/user.service";
import dotenv from "dotenv"
import faker from "faker";

dotenv.config()

describe('UserService', () => {
    let userRepository: UserRepository;
    let userService: UserService;

    beforeAll(async () => {
        await MongoDatabase.getInstance()
    });

    afterAll(async () => {
        await MongoDatabase.close();
    });

    beforeEach(async () => {
        userRepository = new UserMongoRepository();
        userService = new UserService(userRepository);
    });

    it('should save a user', async () => {
        const request: CreateUserDto = { username: faker.internet.userName() , password: "123456" };
        const savedUser = await userService.saveUser(request);
        expect(savedUser.getId()).toBeDefined();
        expect(savedUser.getId().length).toEqual(24);
        expect(savedUser.getUsername()).toEqual(request.username);
        expect(savedUser.getPassword()).not.toEqual(request.password);
    });

    it('should find a user by username', async () => {
        const createdUser = await userService.saveUser({ username: faker.internet.userName(), password: "123456" });
        const user = await userService.getUserByUsername(createdUser.getUsername());
        expect(user).toBeDefined();
        expect(user.getId()).toEqual(createdUser.getId());
        expect(user.getUsername()).toEqual(createdUser.getUsername());
    });
});