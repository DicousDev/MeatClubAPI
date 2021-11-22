import { Request, Response } from "express";
import UserService from "../services/User";

class UserController {
    static async getUser(req: Request, res: Response) {
        return res.status(200).json({message: "User"});
    }

    static async changePassword(req: Request, res: Response) {

    }

    static async changeAddress(req: Request, res: Response) {

    }

    static async autoDelete(req: Request, res: Response) {

    }
}

export default UserController;