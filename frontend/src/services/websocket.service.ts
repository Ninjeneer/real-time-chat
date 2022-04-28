export default class WebSocketService {
    private ws: WebSocket;

    constructor(url: string) {
        this.ws = new WebSocket(url);
    }

    public getWebSocket(): WebSocket {
        return this.ws;
    }
}