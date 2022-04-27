import fastify, { FastifyInstance } from "fastify";

export default class HttpServer {
    private server: FastifyInstance;

    constructor() {
        this.server = fastify({ logger: true });
    }

    private initRoutes(): void {
        
    }
}