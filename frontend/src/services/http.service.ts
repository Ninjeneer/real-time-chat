import { Message } from "../entities/message";

export default class HttpService {
    private url: string;

    constructor(url: string) {
        this.url = url;
    }

    public async getMessageHistory(): Promise<Message[]> {
        return await fetch(`${this.url}/chat/history`).then((response) => response.json())
    }
}