import AuthenticationService from "../../domain/services/authentication.service";
import { CreateUserDto } from "../../domain/dto/create-user.dto";
import { FastifyInstance } from "fastify";
import InvalidPassword from "../../domain/exceptions/invalid-password";
import { LoginUserDto } from "../../domain/dto/login.dto";
import UserAlreadyExist from "../../domain/exceptions/user-already-exist";
import UserService from "../../domain/adapters/user.service";

export default class UserController {
    private readonly fastifyInstance: FastifyInstance;
    private readonly userService: UserService;
    private readonly authenticationService: AuthenticationService;

    constructor(fastifyInstance: FastifyInstance, userService: UserService, authenticationService: AuthenticationService) {
        this.fastifyInstance = fastifyInstance;
        this.userService = userService;
        this.authenticationService = authenticationService;
    }

    public initRoutes(): void {
        this.fastifyInstance.post("/auth/register", (req, res) => {
            const payload = req.body as CreateUserDto;
            this.userService.saveUser({ username: payload.username, password: payload.password })
                .then((user) => res.status(201).send(user))
                .catch((err) => {
                    if (err instanceof UserAlreadyExist) {
                        res.status(409).send(err.message);
                    } else {
                        res.status(500).send("An error occurred");
                    }
                    console.log(err)
                });
        });

        this.fastifyInstance.post("/auth/login", (req, res) => {
            const payload = req.body as LoginUserDto;
            this.authenticationService.login({ username: payload.username, password: payload.password })
                .then((user) => res.send(user))
                .catch((err) => {
                    if (err instanceof InvalidPassword) {
                        res.status(401).send(err.message);
                    } else {
                        res.status(500).send("An error occurred");
                    }
                    console.log(err)
                });
        });
    }
}