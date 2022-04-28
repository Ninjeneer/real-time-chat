export default class UserDoesNotExist extends Error {
    constructor() {
        super('User does not exist');
    }
}