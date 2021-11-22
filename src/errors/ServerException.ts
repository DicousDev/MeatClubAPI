class ServerException extends Error {
    public readonly statusCode: number = 500;

    constructor() {
        super("Erro de servidor. Tente novamente mais tarde!");
        Object.setPrototypeOf(this, ServerException.prototype);
    }
}

export default ServerException;