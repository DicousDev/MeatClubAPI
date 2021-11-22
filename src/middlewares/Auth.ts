import { Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

export default async function AuthUser(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    // "Bearer [TOKEN]"
    // [TOKEN]
    const token = authHeader && authHeader.split(" ")[1];

    if(!token) {
        return res.status(401).json({message: "Acesso negado."});
    }

    try {
        const secret = process.env.SECRET;
        console.log(secret);
        const id = <any> await jwt.verify(token, secret);
        req.id = id.id.toString();
        return next();
    }
    catch {
        return res.status(400).json({message: "Token inválido."});
    }
}