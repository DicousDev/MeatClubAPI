class UserNotFoundException extends Error {
    public readonly statusCode: number = 404;

    constructor() {
        super("Usuário não encontrado.");
        Object.setPrototypeOf(this, UserNotFoundException.prototype);
    }
}

export default UserNotFoundException;