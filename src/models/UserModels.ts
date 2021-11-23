import database from "../database";
import { UserInterface, EnderecoInterface } from "../services/User";

export default class UserModels {
    static async create(user: UserInterface, endereco: EnderecoInterface) {
        const nome = user.nome.toString() + " " + user.sobrenome;
        const pool = database.promise();

        const [usuario] = <any> await pool.query(`INSERT INTO USUARIO(NOME, EMAIL, SENHA, CPF, TELEFONE) VALUES(?, ?, ?, ?, ?)`,
            [nome, user.email, user.senha, user.cpf, user.telefone]
        )

        const [enderecoUser] = <any> await pool.query(`INSERT INTO ENDERECO(RUA, BAIRRO, CIDADE, NUMERO, IDUSUARIO) VALUES(?, ?, ?, ?, ?)`,
            [endereco.rua, endereco.bairro, endereco.cidade, endereco.numero, usuario.insertId]
        )

        return {usuario, endereco: enderecoUser};
    }

    static async findByPk(id: Number) {
        const pool = database.promise();
        const [usuario]: any = <any> await pool.query("SELECT USUARIO.NOME, USUARIO.EMAIL, USUARIO.SENHA, USUARIO.TELEFONE, ENDERECO.RUA, ENDERECO.BAIRRO, ENDERECO.CIDADE, ENDERECO.NUMERO FROM USUARIO INNER JOIN ENDERECO ON USUARIO.IDUSUARIO = ENDERECO.IDUSUARIO WHERE USUARIO.IDUSUARIO = ?",
            [id]
        )

        return usuario.shift();
    }

    static async findUser(email: String) {
        const pool = database.promise();
        const [usuario]: any[] = <any[]> await pool.query('SELECT * FROM USUARIO WHERE `email` = ?',
            [email]
        )

        return usuario.shift();
    }

    static async checkEmailExists(email: String): Promise<boolean> {
        const pool = database.promise();
        const [usuario]: any[] = <any[]> await pool.query('SELECT * FROM USUARIO WHERE `email` = ?',
            [email]
        )

        return usuario.length > 0;
    }

    static async changePassword(id: Number, senha: String) {
        const pool = database.promise();
        await pool.query('UPDATE USUARIO SET `SENHA` = ? WHERE `IDUSUARIO` = ?',
            [senha, id]
        )
    }

    static async changeAddress(id: Number, rua: String, bairro: String, cidade: String, numero: String) {
        const pool = database.promise();
        await pool.query('UPDATE ENDERECO SET `RUA` = ?, `BAIRRO` = ?, `CIDADE` = ?, `NUMERO` = ? WHERE `IDUSUARIO` = ?',
            [rua, bairro, cidade, numero, id]
        )
    }

    static async deleteUser(id: Number) {
        const pool = database.promise();
        await pool.query('DELETE FROM ENDERECO WHERE `IDUSUARIO` = ?',
            [id]
        )

        await pool.query('DELETE FROM USUARIO WHERE `IDUSUARIO` = ?',
            [id]
        )
    }
}