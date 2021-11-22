class PasswordNotEqualsException extends Error {
    public readonly statusCode: number = 422;

    constructor() {
        super("Senhas não confere.");
        Object.setPrototypeOf(this, PasswordNotEqualsException.prototype);
    }
}

export default PasswordNotEqualsException;