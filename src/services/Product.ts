import ProductIsNotDescriptionException from "../errors/ProductIsNotDescriptionException";
import ProductNotFoundException from "../errors/ProductNotFoundException";
import ProductModels from "../models/ProductModels";

export default class ProductService {

    static async getAll() {
        const products = await ProductModels.getAll();
        return products;
    }

    static async create(produto: String) {
        
        if(!produto) {
            throw new ProductIsNotDescriptionException();
        }

        await ProductModels.create(produto);
    }

    static async deleteById(id: Number) {
        const product = await ProductModels.findById(id);

        if(!product) {
            throw new ProductNotFoundException();
        }

        await ProductModels.deleteById(id);
    }
}