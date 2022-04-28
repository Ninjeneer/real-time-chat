import User from "./user";

export default class Message {
    public text: string;
    public sentAt: Date;
    public user: User;

    constructor(text: string, user: User) {
        this.text = text
        this.user = user;
        this.sentAt = new Date();
    }
}