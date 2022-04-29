import InvalidToken from "../../domain/exceptions/invalid-token";

export default function authenticateUser(req) {
    // Get the token in the request header
    const token = req.headers['x-access-token'];
    const user = this.userUserService.getUserByToken(token);
    if (!user) {
        throw new InvalidToken();
    }
}