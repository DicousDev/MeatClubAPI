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
    
    static async getUser() {

    }

    static async changePassword() {

    }

    static async changeAddress() {

    }

    static async autoDelete() {

    }
}

export default UserService;