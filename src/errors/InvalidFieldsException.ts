class InvalidFieldsException extends Error {
    public readonly statusCode: number = 400;

    constructor() {
        super("Todos os campos são obrigatórios");
        Object.setPrototypeOf(this, InvalidFieldsException.prototype);
    }
}

export default InvalidFieldsException;