import { Request, Response } from "express";
import PlanoNotExistsException from "../errors/PlanoNotExistsException";
import PlanoNotFoundCartException from "../errors/PlanoNotFoundCartException";
import Carrinho from "../services/Carrinho";

export default class CarrinhoController {
    static async getAll(req: Request, res: Response) {
        const idUser = Number(req.id);

        try {
            const planos = await Carrinho.getAll(idUser);
            return res.status(200).json(planos);
        }
        catch(error) {
            console.log(error);
            return res.status(500).json({message: "Erro de servidor. Tente novamente mais tarde!"});
        }
    }

    static async getById(req: Request, res: Response) {
        const idUser = Number(req.id);
        const idPlano: Number = Number(req.params.id);
        
        try {
            const plano = await Carrinho.getById(idUser, idPlano);
            return res.status(200).json(plano);
        }
        catch(error) {
            if(error instanceof PlanoNotFoundCartException) {
                return res.status(error.statusCode).json({message: error.message});
            }

            return res.status(500).json({message: "Erro de servidor. Tente novamente mais tarde!"});
        }
    }

    static async addPlano(req: Request, res: Response) {
        const idUser: Number = Number(req.id);
        const idPlano: Number = Number(req.params.id);

        try {
            await Carrinho.addPlano(idUser, idPlano);
            return res.status(201).json({message: "Plano inserido no carrinho com sucesso!"});
        }
        catch(error) {
            if(error instanceof PlanoNotExistsException) {
                return res.status(error.statusCode).json({message: error.message});
            }

            return res.status(500).json({message: "Erro de servidor. Tente novamente mais tarde!"});
        }
    }

    static async deleteById(req: Request, res: Response) {
        const idUser = Number(req.id);
        const id: Number = Number(req.params.id);

        try {
            await Carrinho.deleteById(idUser, id);
            return res.status(200).json({message: "Plano removido do carrinho com sucesso!"});
        }
        catch(error) {
            if(error instanceof PlanoNotFoundCartException) {
                return res.status(error.statusCode).json({message: error.message});
            }

            console.log(error);
            return res.status(500).json({message: "Erro de servidor. Tente novamente mais tarde!"});
        }
    }
    
    static async deleteAll(req: Request, res: Response) {
        const idUser = Number(req.id);

        try {
            await Carrinho.deleteAll(idUser);
            return res.status(200).json({message: "Todos produtos removidos do carrinho com sucesso!"});
        }
        catch(error) {
            console.log(error);
            return res.status(500).json({message: "Erro de servidor. Tente novamente mais tarde!"});
        }
    }
}