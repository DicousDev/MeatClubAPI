class InvalidPasswordException extends Error {
    public readonly statusCode: number = 422;

    constructor() {
        super("Senha inválida.");
        Object.setPrototypeOf(this, InvalidPasswordException.prototype);
    }
}

export default InvalidPasswordException;