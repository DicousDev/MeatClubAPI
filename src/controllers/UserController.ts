import { Request, Response } from "express";
import InvalidFieldsException from "../errors/InvalidFieldsException";
import InvalidPasswordException from "../errors/InvalidPasswordException";
import PasswordLengthException from "../errors/PasswordLengthException";
import PasswordNotEqualsException from "../errors/PasswordNotEqualsException";
import UserNotFoundException from "../errors/UserNotFoundException";

import UserService from "../services/User";

class UserController {
    static async getUser(req: Request, res: Response) {
        try {
            const user = await UserService.getUser(Number(req.id));
            return res.status(200).json(user);
        }
        catch(error) {
            if(error instanceof UserNotFoundException) {
                return res.status(error.statusCode).json({message: error.message});
            }
            
            return res.status(500).json({message: "Erro de servidor. Tente novamente mais tarde!"});
        }
    }
    
    static async changePassword(req: Request, res: Response) {
        const body: any = <any> req.body;
        const id = Number(req.id);
        
        try {
            await UserService.changePassword(id, body.senhaAtual, body.senha, body.confirmaSenha);
            return res.status(200).json({message: "Senha do usuário atualizado com sucesso!"})
        }
        catch(error) {
            if(error instanceof InvalidFieldsException || error instanceof PasswordNotEqualsException || 
                error instanceof InvalidPasswordException || error instanceof PasswordLengthException) {
                return res.status(error.statusCode).json({message: error.message});
            }

            return res.status(500).json({message: "Erro de servidor. Tente novamente mais tarde!"});
        }
    }

    static async changeAddress(req: Request, res: Response) {

    }

    static async autoDelete(req: Request, res: Response) {

    }
}

export default UserController;