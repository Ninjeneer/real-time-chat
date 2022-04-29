export type SendMessageDto = {
    userId: string; // Actually the userId should be determined by the token used in the request, to avoid identity theft
    text: string;
}