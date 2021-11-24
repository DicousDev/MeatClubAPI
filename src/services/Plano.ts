import InvalidFieldsException from "../errors/InvalidFieldsException";
import PlanoNotExistsException from "../errors/PlanoNotExistsException";
import PlanoModels from "../models/PlanoModels";

export default class PlanoService {
    static async getAll() {
        const planos = await PlanoModels.getAll();
        return planos;
    }

    static async create(nome: String, preco: String, periodo: String) {
        if(!nome || !preco || !periodo) {
            throw new InvalidFieldsException();
        }

        await PlanoModels.create(nome, preco, periodo);
    }

    static async deleteById(id: Number) {
        const plano = await PlanoModels.getById(id);

        if(!plano) {
            throw new PlanoNotExistsException();
        }

        PlanoModels.deleteById(id);
    }
}