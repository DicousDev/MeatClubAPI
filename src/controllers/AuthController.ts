import { Request, Response } from "express";
import AuthService from "../services/AuthUser";

import { UserInterface } from "../services/User";

import InvalidFieldsException from "../errors/InvalidFieldsException";
import InvalidPasswordException from "../errors/InvalidPasswordException";
import PasswordLengthException from "../errors/PasswordLengthException";
import EmailInvalidException from "../errors/EmailInvalidException";
import UserNotFoundException from "../errors/UserNotFoundException";
import PasswordNotEqualsException from "../errors/PasswordNotEqualsException";

class AuthController {
    static async create(req: Request, res: Response) {
        const body = req.body;

        const userData = {
            nome: body.nome,
            sobrenome: body.sobrenome,
            email: body.email,
            senha: body.senha,
            confirmarSenha: body.confirmarSenha,
            cpf: body.cpf,
            telefone: body.telefone
        }

        const enderecoData = {
            rua: body.rua,
            numero: body.numero,
            bairro: body.bairro,
            cidade: body.cidade
        }

        try {
            const user = await AuthService.create(userData, enderecoData);
            return res.status(201).json(user);
        }
        catch(error) {
            if(error instanceof InvalidFieldsException) {
                return res.status(error.statusCode).json({message: error.message});
            }
            else if(error instanceof PasswordNotEqualsException) {
                return res.status(error.statusCode).json({message: error.message});
            }
            else if(error instanceof PasswordLengthException) {
                return res.status(error.statusCode).json({message: error.message});
            }
            else if(error instanceof EmailInvalidException) {
                return res.status(error.statusCode).json({message: error.message});
            }

            return res.status(500).json({message: "Erro de servidor. Tente novamente mais tarde!"});
        }
    }

    static async login(req: Request, res: Response) {
        const { email, password } = req.body; 

        try {
            const token = await AuthService.login(email, password);
            return res.status(200).json({message: "Usuário authenticado com sucesso!", token});
        }
        catch(error) {
            if(error instanceof InvalidFieldsException) {
                return res.status(error.statusCode).json({message: error.message});
            }
            else if(error instanceof UserNotFoundException) {
                return res.status(error.statusCode).json({message: error.message});
            }
            else if(error instanceof InvalidPasswordException) {
                return res.status(error.statusCode).json({message: error.message});
            }

            return res.status(500).json({message: "Erro de servidor. Tente novamente mais tarde!"});
        }
    }
}

export default AuthController;