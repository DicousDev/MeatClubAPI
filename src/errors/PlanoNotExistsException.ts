class PlanoNotExistsException extends Error {
    public readonly statusCode: number = 404;

    constructor() {
        super("Plano não encontrado");
        Object.setPrototypeOf(this, PlanoNotExistsException.prototype);
    }
}

export default PlanoNotExistsException;