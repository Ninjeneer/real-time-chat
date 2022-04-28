import User from "../entities/user";

export type SendMessageDto = {
    user: User;
    text: string;
}