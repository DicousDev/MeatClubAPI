class EmailInvalidException extends Error {
    public readonly statusCode: number = 422;

    constructor() {
        super("O email está em uso.");
        Object.setPrototypeOf(this, EmailInvalidException.prototype);
    }
}

export default EmailInvalidException;