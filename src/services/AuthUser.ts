import database from "../database";
import UserModels from "../models/UserModels";
import { UserInterface, EnderecoInterface } from "./User";

import InvalidFieldsException from "../errors/InvalidFieldsException";
import PasswordLengthException from "../errors/PasswordLengthException";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import EmailInvalidException from "../errors/EmailInvalidException";
import UserNotFoundException from "../errors/UserNotFoundException";
import InvalidPasswordException from "../errors/InvalidPasswordException";
import PasswordNotEqualsException from "../errors/PasswordNotEqualsException";

export default class AuthService {

    static async create(user: UserInterface, endereco: EnderecoInterface) {
        if(!user.nome || !user.sobrenome || !user.email || !user.senha || !user.confirmarSenha || 
            !user.cpf || !user.telefone || !endereco.rua || !endereco.numero || !endereco.bairro || !endereco.cidade) {
            throw new InvalidFieldsException();
        }
    
        if (user.senha !== user.confirmarSenha) {
            throw new PasswordNotEqualsException();
        }
    
        if (user.senha.length < 6) {
            throw new PasswordLengthException();
        }

        const userExists = await UserModels.checkEmailExists(user.email);
        
        if(userExists) {
            throw new EmailInvalidException();
        }

        const cpfSalt = await bcrypt.genSalt(12);
        const cpfHash = await bcrypt.hash(user.cpf.toString(), cpfSalt);
    
        const passwordSalt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(user.senha.toString(), passwordSalt);

        user.cpf = cpfHash;
        user.senha = passwordHash;

        return await UserModels.create(user, endereco);
    }

    static async login(email: String, senha: String) {
        
        if(!email || !senha) {
            throw new InvalidFieldsException();
        }

        const userExists: any = <any> await UserModels.findUser(email);
        if(!userExists) {
            throw new UserNotFoundException();
        }

        const userPassword = userExists.SENHA;
        const checkPassword = await bcrypt.compare(senha.toString(), userPassword);

        if(!checkPassword) {
            throw new InvalidPasswordException();
        }

        const secret = process.env.SECRET;
        const token = jwt.sign({
            id: userExists.IDUSUARIO
        }, secret);

        return token;
    }

    // static async getUsers() {
    //     const [usuarios] = (await database.promise().query('SELECT * FROM USUARIO') as unknown) as [UserInterface[]];
    //     return usuarios;
    // }
}