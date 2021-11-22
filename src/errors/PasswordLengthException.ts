class PasswordLengthException extends Error {
    public readonly statusCode: number = 422;

    constructor() {
        super("O minimo de caracteres de uma senha é 6.");
        Object.setPrototypeOf(this, PasswordLengthException.prototype);
    }
}

export default PasswordLengthException;