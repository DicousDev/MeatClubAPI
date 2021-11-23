import InvalidFieldsException from "../errors/InvalidFieldsException";
import UserNotFoundException from "../errors/UserNotFoundException";
import UserModels from "../models/UserModels";

import bcrypt from "bcrypt";
import PasswordNotEqualsException from "../errors/PasswordNotEqualsException";
import InvalidPasswordException from "../errors/InvalidPasswordException";
import PasswordLengthException from "../errors/PasswordLengthException";


export interface UserInterface {
    nome: String,
    sobrenome: String,
    email: String,
    senha: String,
    confirmarSenha: String,
    cpf: String,
    telefone: String
} 

export interface EnderecoInterface {
    rua: String,
    numero: String,
    bairro: String,
    cidade: String
}

class UserService {
    
    static async getUser(id: Number) {
        const user = await UserModels.findByPk(id);

        if(!user) {
            throw new UserNotFoundException();
        }

        const userData = {
            nome: user.NOME,
            email: user.EMAIL,
            telefone: user.TELEFONE,
        }

        const enderecoData = {
            rua: user.RUA,
            bairro: user.BAIRRO,
            cidade: user.CIDADE,
            numero: user.NUMERO
        }

        const data = {
            user: userData,
            endereco: enderecoData
        }

        return data;
    }

    static async changePassword(id: Number, senhaAtual: String, senha: String, confirmaSenha: String) {
        
        if(!id || !senhaAtual || !senha || !confirmaSenha) {
            throw new InvalidFieldsException();
        }

        if(senha !== confirmaSenha) {
            throw new PasswordNotEqualsException();
        }

        const user = await UserModels.findByPk(id);

        if(!user) {
            throw new UserNotFoundException();
        }

        const checkPassword = await bcrypt.compare(senhaAtual.toString(), user.SENHA);

        if(!checkPassword) {
            throw new InvalidPasswordException();
        }

        if(senha.length < 6) {
            throw new PasswordLengthException();
        }

        const senhaSalt = await bcrypt.genSalt(12);
        const senhaNova = await bcrypt.hash(senha.toString(), senhaSalt);
        await UserModels.changePassword(id, senhaNova);
    }

    static async changeAddress(id: Number, rua: String, bairro: String, cidade: String, numero: String) {

        const user = await UserModels.findByPk(id);

        if(!user) {
            throw new UserNotFoundException();
        }

        await UserModels.changeAddress(id, rua || user.RUA, bairro || user.BAIRRO, cidade || user.CIDADE, numero || user.NUMERO);
    }

    static async autoDelete(id: Number) {
        
        const user = await UserModels.findByPk(id);

        if(!user) {
            throw new UserNotFoundException();
        }

        await UserModels.deleteUser(id);
    }
}

export default UserService;