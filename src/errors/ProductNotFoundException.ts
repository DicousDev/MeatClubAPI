class ProductNotFoundException extends Error {
    public readonly statusCode: number = 404;

    constructor() {
        super("Produto não encontrado.");
        Object.setPrototypeOf(this, ProductNotFoundException.prototype);
    }
}

export default ProductNotFoundException;