export default class InvalidPassword extends Error {
    constructor() {
        super('Invalid password');
    }
}