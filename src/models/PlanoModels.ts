import database from "../database";

export default class PlanoModels {

    static async getAll() {
        const pool = database.promise();
        const [planos]: any[] = <any[]> await pool.query('SELECT * FROM PLANO')
        return planos;
    }

    static async getById(id: Number) {
        const pool = database.promise();
        const [planos]: any = <any> await pool.query('SELECT * FROM PLANO WHERE `IDPLANO` = ?',
            [id]
        );

        return planos.shift();
    }

    static async create(nome: String, preco: String, periodo: String) {
        const pool = database.promise();
        await pool.query('INSERT INTO PLANO(NOME, PRECO, PERIODO) VALUES(?, ?, ?)',
            [nome, preco, periodo]
        )
    }

    static async deleteById(id: Number) {
        const pool = database.promise();
        await pool.query('DELETE FROM PLANO WHERE `IDPLANO` = ?',
            [id]
        )
    }
}