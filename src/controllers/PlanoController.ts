import { Request, Response } from "express";

import InvalidFieldsException from "../errors/InvalidFieldsException";
import PlanoNotExistsException from "../errors/PlanoNotExistsException";
import PlanoService from "../services/Plano";

export default class PlanoController {
    static async getPlanos(req: Request, res: Response) {

        try {
            const planos = await PlanoService.getAll();
            return res.status(200).json(planos);
        }
        catch {
            return res.status(500).json({message: "Erro de servidor. Tente novamente mais tarde!"});
        }
    }

    static async createPlano(req: Request, res: Response) {
        const body = req.body;

        try {
            await PlanoService.create(body.nome, body.preco, body.periodo);
            res.status(201).json({message: "Plano cadastrado no sistema com sucesso!"});
        }
        catch(error) {
            if(error instanceof InvalidFieldsException) {
                return res.status(error.statusCode).json({message: error.message}); 
            }

            return res.status(500).json({message: "Erro de servidor. Tente novamente mais tarde!"});
        }
    }

    static async deletePlano(req: Request, res: Response) {
        const id = Number(req.params.id);

        try {
            await PlanoService.deleteById(id);
            return res.status(200).json({message: "Plano removido do sistema com sucesso!"});
        }
        catch(error) {
            if(error instanceof PlanoNotExistsException) {
                return res.status(error.statusCode).json({message: error.message});
            }

            return res.status(500).json({message: "Erro de servidor. Tente novamente mais tarde!"});
        }
    }
}