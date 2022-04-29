export default class InvalidToken extends Error {
    constructor() {
        super('Invalid token');
    }
}