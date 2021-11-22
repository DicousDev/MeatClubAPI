import { Request, Response } from "express";

import UserService from "../services/User";

class UserController {
    static async getUser(req: Request, res: Response) {
        try {
            const user = await UserService.getUser(Number(req.id));
            return res.status(200).json(user);
        }
        catch {
            return res.status(500).json({message: "Erro de servidor. Tente novamente mais tarde!"});
        }
    }

    static async changePassword(req: Request, res: Response) {

    }

    static async changeAddress(req: Request, res: Response) {

    }

    static async autoDelete(req: Request, res: Response) {

    }
}

export default UserController;