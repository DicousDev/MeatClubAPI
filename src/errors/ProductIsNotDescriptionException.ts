class ProductIsNotDescriptionException extends Error {
    public readonly statusCode: number = 400;

    constructor() {
        super("Nenhum produto para adicionar.");
        Object.setPrototypeOf(this, ProductIsNotDescriptionException.prototype);
    }
}

export default ProductIsNotDescriptionException;