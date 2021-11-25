class PlanoNotFoundCartException extends Error {
    public readonly statusCode: number = 404;

    constructor() {
        super("Plano não encontrado no carrinho.");
        Object.setPrototypeOf(this, PlanoNotFoundCartException.prototype);
    }
}

export default PlanoNotFoundCartException;