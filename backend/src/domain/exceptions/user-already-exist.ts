export default class UserAlreadyExist extends Error {
    constructor() {
        super('User already exist');
    }
}