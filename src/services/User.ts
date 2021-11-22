import UserModels from "../models/UserModels";


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
        console.log("===================");
        console.log(user);

        return user;
    }

    static async changePassword() {

    }

    static async changeAddress() {

    }

    static async autoDelete() {

    }
}

export default UserService;