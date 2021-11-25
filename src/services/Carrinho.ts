import PlanoModels from "../models/PlanoModels";
import CarrinhoModels from "../models/CarrinhoModels";
import PlanoNotExistsException from "../errors/PlanoNotExistsException";
import PlanoNotFoundCartException from "../errors/PlanoNotFoundCartException";

export default class Carrinho {
    static async getAll(idUser: Number) {
        const planos = await CarrinhoModels.getAll(idUser);
        return planos;
    }

    static async getById(idUser: Number, id: Number) {
        const plano = await CarrinhoModels.getById(idUser, id);

        if(!plano) {
            throw new PlanoNotFoundCartException();
        }

        return plano;
    }

    static async addPlano(idUser: Number, idPlano: Number) {
        const plano = await PlanoModels.getById(idPlano);
        console.log(plano);

        if(!plano) {
            throw new PlanoNotExistsException();
        }

        try {
            await CarrinhoModels.addPlano(idUser, idPlano);
        }
        catch(error) {
            console.log(error);
        }

        CarrinhoModels.addPlano(idUser, idPlano);
    }

    static async deleteById(idUser: Number, id: Number) {
        const planoExists = await CarrinhoModels.getById(idUser, id);

        if(!planoExists) {
            throw new PlanoNotFoundCartException();
        }

        await CarrinhoModels.deleteById(idUser, Number(planoExists.IDPLANO));
    }
    
    static async deleteAll(idUser: Number) {
        try {
            await CarrinhoModels.deleteAll(idUser);
        }
        catch(error) {
            console.log(error);
        }
    }
}