export default class Message {
    public text: string;
    public sentAt: Date;
    public user: string;

    constructor(text: string, user: string) {
        this.text = text
        this.user = user;
        this.sentAt = new Date();
    }
}