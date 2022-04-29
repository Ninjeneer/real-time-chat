import { Message } from "../entities/message";

export default class HttpService {
    private url: string;

    constructor(url: string) {
        this.url = url;
    }

    public async getMessageHistory(): Promise<Message[]> {
        return await fetch(`${this.url}/chat/history`, { headers: this.buildHeaders() }).then((response) => response.json())
    }

    public register(username: string, password: string): Promise<Response> {
        return fetch(`${this.url}/auth/register`, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: this.buildHeaders()
        })
    }

    public login(username: string, password: string): Promise<Response> {
        return fetch(`${this.url}/auth/login`, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: this.buildHeaders()
        })
    }

    private buildHeaders(): HeadersInit {
        const user = localStorage.getItem('user');
        return {
            'Content-Type': 'application/json',
            'Authorization': user ? `Bearer ${JSON.parse(user).token}` : null
        }
    }
}