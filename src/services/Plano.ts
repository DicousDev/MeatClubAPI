import InvalidFieldsException from "../errors/InvalidFieldsException";
import PlanoNotExistsException from "../errors/PlanoNotExistsException";
import ProductNotFoundException from "../errors/ProductNotFoundException";
import PlanoModels from "../models/PlanoModels";
import ProductModels from "../models/ProductModels";

export default class PlanoService {
    static async getAll() {
        const planos = await PlanoModels.getAll();
        return planos;
    }

    static async getById(id: Number) {
        const plano = await PlanoModels.getById(id);
        return plano;
    }

    static async create(nome: String, preco: String, periodo: String) {
        if(!nome || !preco || !periodo) {
            throw new InvalidFieldsException();
        }

        await PlanoModels.create(nome, preco, periodo);
    }

    static async addProduto(id: Number, idProduto: Number) {
        if(!id || !idProduto) {
            throw new InvalidFieldsException();
        }
        
        const plano = await PlanoModels.getById(id);
        if(!plano) {
            throw new PlanoNotExistsException();
        }

        const produto = await ProductModels.findById(idProduto)
        if(!produto) {
            throw new ProductNotFoundException();
        }

        try {
            await PlanoModels.addProduto(id, idProduto);
        }
        catch {
            console.log("Erro ao tentar adicionar produto ao plano.");    
        }
    }

    static async deleteById(id: Number) {
        const plano = await PlanoModels.getById(id);

        if(!plano) {
            throw new PlanoNotExistsException();
        }

        try {
            await PlanoModels.deleteById(id);
        }
        catch {
            console.log("Erro ao tentar remover plano.");
        }
    }
}